export function filterKnowledgeByMark(knowledgeList, marks) {
  return knowledgeList.filter( knowledge => {
    Object.keys(marks).every(key =>{ 
      if(marks[key] && knowledge.marks[key]){
        return knowledge
      }
    })
  })
}