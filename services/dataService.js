export async function getGeography() {
  return {
    country: "Bangladesh",
    hierarchy: ["Division", "District", "Thana", "Union", "Ward", "Neighborhood"]
  };
}

export async function getRoles() {
  return [
    "National Director",
    "Division Head",
    "District Coordinator",
    "Thana Manager",
    "Union Leader",
    "Ward Coordinator",
    "Team Member"
  ];
}
