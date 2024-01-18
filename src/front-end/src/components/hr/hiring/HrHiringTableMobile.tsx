import React from "react";
import EmployeeCard from "./EmployeeCard";
import { ClickableSpan } from "../../../styles/hr/profile";
import { handleClickHistory } from "../utils/utils";

interface Data {
  employee_id: number;
  name: string;
  email: string;
  generate_token_and_send_email: boolean;
  link: string;
  status: string;
}

type HrHiringTableMobileProps = {
  currentTab: string;
  rows: Data[];
};

const HrHiringTableMobile: React.FC<HrHiringTableMobileProps> = ({
  currentTab,
  rows,
}) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          paddingRight: "20px",
          paddingTop: "10px",
        }}
      >
        <ClickableSpan onClick={handleClickHistory} style={{ cursor: "pointer" }}>
          History
        </ClickableSpan>
      </div>
      {rows.map((row) => (
        <EmployeeCard
          key={row.employee_id}
          employee_id={row.employee_id}
          name={row.name}
          email={row.email}
          generate_token_and_send_email={row.generate_token_and_send_email}
          link={row.link}
          status={row.status}
          currTab={currentTab}
        />
      ))}
    </>
  );
};

export default HrHiringTableMobile;
