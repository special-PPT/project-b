interface RegData {
  employee_id: number;
  name: string;
  email: string;
  generate_token_and_send_email: boolean;
  link: string;
  status: string;
}

function createData(
  employee_id: number,
  name: string,
  email: string,
  generate_token_and_send_email: boolean,
  link: string,
  status: string
): RegData {
  return {
    employee_id,
    name,
    email,
    generate_token_and_send_email,
    link,
    status,
  };
}

function generateRandomData(index: number): RegData {
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
  const statusOptions = ["Send", "Pass Due", "Not Send"];

  return createData(
    index + 1,
    names[index % names.length],
    emails[index % emails.length],
    Math.random() < 0.5, // Randomly decide true/false for generating token
    `https://example.com/employee/${index + 1}`,
    statusOptions[Math.floor(Math.random() * statusOptions.length)]
  );
}

export const regData: RegData[] = [];
for (let i = 0; i < 15; i++) {
  regData.push(generateRandomData(i));
}


interface onboardData {
  employee_id: number;
  name: string;
  email: string;
  status: string;
}

function createData1(
  employee_id: number,
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
    index + 1,
    names[index % names.length],
    emails[index % emails.length],
    statusOptions[Math.floor(Math.random() * statusOptions.length)]
  );
}

export const onboardDataArray: onboardData[] = [];
for (let i = 0; i < 15; i++) {
  onboardDataArray.push(generateRandomData1(i));
}
