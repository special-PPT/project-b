const handleSendClick = (id: number) => {
  console.log("clicked");
};

const handleLinkClick = (link: string) => {
  window.open(link, "_blank");
};

const handleClickHistory = () => {
  console.log();
};

const handleRowClick = (employeeId: string) => {
  const url = `/hr/employee-profile/${employeeId}`;
  window.open(url, "_blank");
};

const handleApplicationClick = (employeeId: string) => {
  const url = `/hr/employee-application/${employeeId}`;
  window.open(url, "_blank");
};

const actionStyle = {
  "& .MuiBottomNavigationAction-label": {
    fontSize: "1.3rem",
    "&.Mui-selected": {
      fontSize: "1.3rem",
      textDecoration: "underline",
    },
  },
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

const calculateRemainingDays = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (start > end) {
    return -1;
  }

  const diffTime = Math.abs(end.getTime() - start.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

async function sendNotificationEmail(
  email: string,
  nextStep: string
): Promise<void> {
  if (nextStep.startsWith("Submit")) {
    const subject = nextStep; // Subject with the "Submit" keyword and the document name
    const text =
      "Login to your account at 'http://localhost:3000/login' to submit the document.";
    const html = `<p>Login to your account at <a href='http://localhost:3000/login'>http://localhost:3000/login</a> to submit the document.</p>`;

    try {
      const response = await fetch(
        "http://localhost:8000/hr/send-notifications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ toUser: email, subject, text, html }),
        }
      );

      const result = await response.json();
      if (response.ok) {
        alert("Notification has been sent");
      } else {
        throw new Error(result.message || "Failed to send email");
      }
    } catch (error) {
      console.error("Failed to send email", error);
      alert("Failed to send notification");
    }
  }
}

export {
  handleSendClick,
  handleLinkClick,
  handleClickHistory,
  handleRowClick,
  handleApplicationClick,
  actionStyle,
  formatDate,
  calculateRemainingDays,
  sendNotificationEmail,
};
