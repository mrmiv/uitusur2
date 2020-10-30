
export function filterKnowledgeByType(knowledgeList, types){
  let array = [] 
  Object.keys(knowledgeList).map( key => {
    if (types[key]){
      array = [...array, ...knowledgeList[key]]
    }
  })
  return array
}

export function filterKnowledgeByMark(knowledgeList, marks) {
  return knowledgeList.filter(knowledge => Object.keys(marks).find(key => marks[key] && knowledge.marks[key]))
}

export function filterKnowledgeList(knowledgeList, types, marks){
  const knowledgeByType = filterKnowledgeByType(knowledgeList, types)
  const knowledgeByTypeAndMarks = filterKnowledgeByMark(knowledgeByType, marks)
  return knowledgeByTypeAndMarks
}