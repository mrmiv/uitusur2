import { combineReducers } from 'redux'
import staffReducer from './api/staffReducer'
import { CMKReducer, FeedbackReducer, RPDReducer } from './data/AboutReducer'
import { DegreeReducer } from './data/HomeReducer'
import { StudyPlanReducer, CuratorsReducer, ClubsReducer } from './data/StudentReducer'
import LiteratureReducer from './api/literatureReducer'
import newsReducer from './api/newsReducer'
import docsReducer from './api/docsReducer'
import filesReducer from './api/filesReducer'
import knowledgeReducer from './api/knowledgeReducer'


export default combineReducers({
    staff: staffReducer, // Сотрудники
    cmk: CMKReducer, // Документы СМК
    feedback: FeedbackReducer, // Отзывы выпускников
    rpd: RPDReducer, // Рабочие программы дисциплин
    degree: DegreeReducer, // Направления подготовки
    studyplan: StudyPlanReducer, // Учебный план
    curators: CuratorsReducer, // Кураторы студентов
    clubs: ClubsReducer,    // Внеучебная деятельность
    literature: LiteratureReducer, // Литература кафедры + книга
    news: newsReducer, // Новости по типу + новость
    docs: docsReducer, // Регламентирующие документы + один док
    files: filesReducer, // Файлы
    knowledge: knowledgeReducer //База знаний
})