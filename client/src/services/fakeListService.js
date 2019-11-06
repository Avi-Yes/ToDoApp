export const lists = [
  { _id: "5b21ca3eeb7f6fbccd471818", name: "Personal" },
  { _id: "5b21ca3eeb7f6fbccd471814", name: "Shooping List" },
  { _id: "5b21ca3eeb7f6fbccd471820", name: "Work" }
];

export function getLists() {
  return lists.filter(l => l);
}
