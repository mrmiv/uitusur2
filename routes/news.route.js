const { Router, query } = require("express");
const mailer = require("../middleware/middleware.mail");
const router = Router();
const fs = require("fs");
const auth = require('../middleware/middleware.auth')

const News = require("../models/News");
const multipleFileUpload = require("../middleware/middleware.multipleFileUpload");
const deleteFile = require("../middleware/middleware.deleteFile");


// /news
router.get("/", async (req, res) => {
	
	const page = Number(req.query.page) || 1;
	const perpage = Number(req.query.perpage) || 10;
	const type = req.query.type || null;

	try {
		if (type && !(type === 1 || 2 || 3)) {
			return res.status(404).json({ message: "Категория новостей не найдена" });
		}

		const query = {}
		if(type){
			query.type = type
		}

		await News.find(query)
			.select([
				"title",
				"translit_title",
				"annotation",
				"created_at",
				"pin",
				"city",
				"period",
				"deadline",
				"users",
			])
			.sort([
				["pin", -1],
				["created_at", -1],
				["title", 1],
			])
			.skip((page - 1) * perpage)
			.limit(perpage)
			.then(async (data) => {
				const pages = await News.find(query).countDocuments();
				res.json({ data, pages });
			})
			.catch((err) => res.status(400).json({ message: err.message }));
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

/**
 * Получение новости из БД по транслитному названию
 */
router.get("/read/:title", async (req, res) => {
	const {title} = req.params;
	
	try {
		
		const news = await News.findOne({'translit_title': title});

		if (!news) {
			return res.status(404).json({ message: "Новость не найдена" });
		}

		return res.json(news);

	} catch (error) {
		res.status(500).json({ message: error.message });
	}

});

/**
 * Получение новости из БД, по id
 */
router.get("/read-by-id/:id", async (req, res) => {
	const {id} = req.params;

	try {
		
		const news = await News.findById(id);

		if (!news) {
			return res.status(404).json({ message: "Новость не найдена" });
		}

		return res.json(news);

	} catch (error) {
		res.status(500).json({ message: error.message });
	}

});

/**
 * Создание новости в базе данных
 */
router.post("/", [auth, multipleFileUpload],  async (req, res) => {
	const {
		title,
		translit_title,
		body,
		annotation,
		type,
		pin,
		site,
		city,
		deadline,
		users,
		period,
		grant,
		// send_to_email,
	} = req.body;

	try {

		if (!title) { return res.status(400).json({ message: "Поле заголовок является обязательным" })}
		if (!translit_title) {return res.status(400).json({ message: "Поле URL является обязательным" })}
		if (!body) {return res.status(400).json({ message: "Поле сообщение является обязательным" })}
		if (!type) {return res.status(400).json({ message: "Поле тип является обязательным" })}

		const exists = await News.findOne({translit_title})

		if(exists){ return res.status(400).json({ message: "Новость с таким URL уже существует, измените заголовок" })}

		const news = new News({
			title,
			translit_title,
			body,
			annotation,
			type: parseInt(type),
			pin: pin === "true",
			site,
			city,
			deadline,
			users,
			period,
			grant,
			created_at: Date.now()
		})

		// console.log(send_to_email);

		// if (send_to_email === "true") {
		// 	const message = {
		// 		to: [],
		// 		subject: title,
		// 		html: `${body}

		// 		Не нужно отвечать на данное сообщение.
		// 		<br/>
		// 		Кафедра управления инновациями`
		// 	}

		// 	await mailer(message)
		// }
		news.docs = req.filesURLs

		await news.save()
			.then((i) => res.json({ message: `Новость создана. ${i.docs && i.docs.length !== 0 ? '' : 'Вложений нет'}` }))
			.catch((err) => res.status(400).json({ message: err.message }));

	} catch (error) {
		res.status(500).json({ message: error.message });
	}
})

/**
 * @param id
 * Удаление новости по id
 */
router.delete("/read/:id", auth, async (req, res) => {
	const id = req.params.id;

	try {
		const news = await News.findById(id);

		if (!news) {
			return res.status(404).json({ message: "Новость с таким id не найдена" });
		}

		const docsErrors = []

		if(news.docs && news.docs.length !== 0){
			news.docs.forEach( doc => {			

				if(!doc.path){
					return docsErrors.push({doc: doc, error: "Неизвестная ошибка"})
				}

				const path = doc.path.substr(1)

				fs.unlink(path, (err) => {
					if (err) { docsErrors.push({doc: doc.path, error: err.message}) }
				})
			})
		}

		await news.delete()
			.then(() => res.json({ message: `Новость удалена. ${docsErrors.length === 0 ? '' : 'Вложения новости не удалены'}`, docsErrors }));

	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

/**
 * @param id
 * @description Закрепление новости по id
 */
router.put("/read/pin/:id", auth, async (req, res) => {
	const { id } = req.params
	try {

		const news = await News.findById(id)

		if (!news) {
			return res
				.status(404)
				.json({ message: "Такой новости не существует" });
		}

		news.pin = !news.pin

		await news.save()
			.then(q => res.json({ message: `Новость ${q.title} ${q.pin ? "закреплена" : "откреплена"}` }))

	} catch (error) {
		res.status(500).json({ message: error.message });
	}
})

/**
 * @param id, oldDocs = предыдущие файлы новости в JSON
 * @description Редактирование новости по id
 */
router.patch("/read/:id", [auth, multipleFileUpload], async (req, res) => {

	const {id} = req.params
	const { title,
		translit_title,
		annotation,
		site,
		type,
		deadline,
		body,
		city,
		users,
		period,
		grant,
		pin,
		oldDocs } = req.body

	try {

		if (!title) { return res.status(400).json({ message: "Поле заголовок является обязательным" })}
		if (!translit_title) {return res.status(400).json({ message: "Поле URL является обязательным" })}
		if (!body) {return res.status(400).json({ message: "Поле сообщение является обязательным" })}
		if (!type) {return res.status(400).json({ message: "Поле тип является обязательным" })}

		const news = await News.findById(id)

		if (!news){ return res.status(404).json({message: `Новость с таким id не найдена`}) }

		function diff(a, b) {
			return a.filter( i => b.indexOf(i) < 0)
		};

		const oldNewsDocs = JSON.parse(oldDocs)

		if(oldNewsDocs && oldNewsDocs.length !== 0){

			const filesToDelete = diff(news.docs.map( doc => doc.path ), oldNewsDocs.map( doc => doc.path ))

			if(filesToDelete.length !== 0){
				filesToDelete.forEach( path => {			
					fs.unlink(path.substr(1), (err) => {
							if (err) { return res.status(400).json({message: `Файл не был удален. Ошбика: ${err.message}`})}
					})
				})
			}
		}
	
		news.docs = [...oldNewsDocs, ...req.filesURLs]
		news.title =  title, 
		news.translit_title = translit_title 
		news.body = body 
		news.type = type 
		news.annotation = annotation 
		news.site = site 
		news.deadline = deadline 
		news.city = city 
		news.users = users 
		news.period = period 
		news.grant = grant 
		news.pin = pin

		await news.save()
			.then(i => res.json({ message: `Новость ${i.title || ''} обновлена`}))
			.catch((err) => res.status(400).json({ message: `Новость не обновлена. Ошибка: ${err.message}` }))

	} catch (error) {
		res.status(500).json({ message: error.message });
	}
})

module.exports = router;
