interface onboardData {
  employee_id: string;
  name: string;
  email: string;
  status: string;
}

function createData1(
  employee_id: string,
  name: string,
  email: string,
  status: string
): onboardData {
  return {
    employee_id,
    name,
    email,
    status,
  };
}

function generateRandomData1(index: number): onboardData {
  const names = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eve",
    "Frank",
    "Grace",
    "Hannah",
    "Ivan",
    "Julia",
    "Kevin",
    "Luna",
    "Morgan",
    "Nina",
    "Oscar",
  ];
  const emails = [
    "alice@example.com",
    "bob@example.com",
    "charlie@example.com",
  ];
  const statusOptions = ["Pending", "Rejected", "Approved"];

  return createData1(
    (index + 1).toString(),
    names[index % names.length],
    emails[index % emails.length],
    statusOptions[Math.floor(Math.random() * statusOptions.length)]
  );
}

export const onboardDataArray: onboardData[] = [];
for (let i = 0; i < 15; i++) {
  onboardDataArray.push(generateRandomData1(i));
}
