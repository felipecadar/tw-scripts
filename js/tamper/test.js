
const villages = TWMap.villages // {key: {id: XX}}

// find village with ID 2793
const village = Object.values(villages).find(village => village.id === 2793)