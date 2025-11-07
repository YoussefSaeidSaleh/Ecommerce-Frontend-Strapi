import * as React from "react";

export function EmailTemplate({ firstName }) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        lineHeight: "1.6",
      }}
    >
      <h1 style={{ color: "#4CAF50" }}>
        Thank you for your purchase, {firstName}!
      </h1>
      <p>
        We are pleased to inform you that your order has been successfully
        processed and your product has been shipped.
      </p>
      <p>
        We truly appreciate your trust in our store. If you have any questions
        or need support, feel free to reach out at any time.
      </p>
      <p>Thank you again, and we hope to see you soon!</p>
      <p style={{ marginTop: "30px" }}>
        Best regards,
        <br />
        The Team
      </p>
    </div>
  );
}
