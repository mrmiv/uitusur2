const { Router, query } = require("express");
const mailer = require("../middleware/middleware.mail");
const router = Router();
const fs = require("fs");
const auth = require('../middleware/middleware.auth')

const News = require("../models/News");

// /news
router.get("/", async (req, res) => {
	// const {page, perpage} = req.params
	const page = Number(req.query.page) || 1;
	const perpage = Number(req.query.perpage) || 10;
	// console.log(page, perpage);
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

// news/read/:id
router.get("/read/:title", async (req, res) => {
	const {title} = req.params;

	try {
		const news = await News.findOne({translit_title: title});

		if (!news) {
			return res.status(404).json({ message: "Новость не найдена" });
		}

		return res.json(news);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// News/
router.post("/", async (req, res) => {
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
		send_to_email,
	} = req.body;

	if (!title) {
		return res
			.status(400)
			.json({ message: "Поле заголовок является обязательным" });
	}
	if (!translit_title) {
		return res
			.status(400)
			.json({ message: "Поле URL является обязательным" });
	}
	if (!body) {
		return res
			.status(400)
			.json({ message: "Поле сообщение является обязательным" });
	}
	if (!type) {
		return res.status(400).json({ message: "Поле тип является обязательным" });
	}

	try {

		const exists = await News.findOne({translit_title})

		if(exists){
			return res.status(400).json({ message: "Новость с таким URL уже существует, измените заголовок" }); 
		}

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
			created_at: Date.now(),
			docs: []
		});

		// console.log(send_to_email);

		if (send_to_email === "true") {
			const message = {
				to: [],
				subject: title,
				html: `${body}

				Не нужно отвечать на данное сообщение.
				<br/>
				Кафедра управления инновациями`
			}

			await mailer(message)
		}

		if (req.files) {
			const { doc } = req.files;

			if (!typeof doc === Object) {
				for (let i = 0; i < doc.length; i++) {
					const el = doc[i];
					// console.log(el);
					el.mv(`uploads/news/${news._id}_${el.name}`, function (err) {
						if (err) {
							return res
								.status(500)
								.json(`Ошибка при прикреплении документа ${el.name}: ` + err);
						}
						// console.log(el.name + " uploaded");
					});
					news.docs.push(`/uploads/news/${news._id}_${el.name}`);
				}
			} else {
				const el = doc;
				// console.log(el);
				el.mv(`uploads/news/${news._id}_${el.name}`, function (err) {
					if (err) {
						return res
							.status(500)
							.json(`Ошибка при прикреплении документа ${el.name}: ` + err);
					}
					// console.log(el.name + " uploaded");
				});
				news.docs.push(`/uploads/news/${news._id}_${el.name}`);
			}
		}

		try {
			await news
				.save()
				.then(() => res.status(201).json({ message: "Новость создана" }))
				.catch((err) => res.status(400).json({ message: err.message }));
		} catch (error) {
			error instanceof Error.ValidationError;
			return res.status(400).json({
				message: "Проверьте введенные данные",
				errors: error.message,
			});
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// News/read/:id
router.delete("/read/:id", auth, async (req, res) => {
	const id = req.params.id;

	try {
		const news = await News.findById(id);

		if (!news) {
			return res
				.status(404)
				.json({ message: "Такой новости не существует" });
		}

		// if (news.docs){
		//     console.log(news.docs);
		// }

		// try {
		//     // delete doc
		//     fs.unlink(`${doc}`, (err) => {
		//         if (err) {
		//           console.error("Оглавление не было удалено"+ err)
		//         }
		//     })
		//     // files removed
		// } catch(err) {
		//     console.error(err)
		// }

		await news.delete().then(() => res.json({ message: "Новость удалена" }));
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

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

router.patch("/read/:id", auth, async (req, res) => {
	const id = req.params.id;
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
		pin } = req.body

	try {

		if (!title) {
			return res
				.status(400)
				.json({ message: "Поле заголовок является обязательным" });
		}
		if (!body) {
			return res
				.status(400)
				.json({ message: "Поле сообщение является обязательным" });
		}
		if (!type) {
			return res.status(400).json({ message: "Поле тип является обязательным" });
		}

		const news = await News.findByIdAndUpdate(id,{
			title,
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
			pin
		}, (err) => {
			if (err) {
				throw new Error(err.message)
			}
		});

		return res.json({ message: "Новость обновлена"})

		// await news.save()
			// .then(() => res.json({ message: "Новость обновлена" }))

		// try {
		//     // delete doc
		//     fs.unlink(`${doc}`, (err) => {
		//         if (err) {
		//           console.error("Оглавление не было удалено"+ err)
		//         }
		//     })
		//     // delete image
		//     fs.unlink(`${image}`, (err) => {
		//         if (err) {
		//             console.error("Изображение не было удалено"+ err)
		//         }
		//     })
		//     // files removed
		// } catch(err) {
		//     console.error(err)
		// }

	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
