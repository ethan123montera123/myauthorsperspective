import { useState } from "react";

import FormField from "./FormField";

export default function ContactForm() {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Inputs:");
    console.log("fName -", fName);
    console.log("lName -", lName);
    console.log("email -", email);
    console.log("subject -", subject);
    console.log("message -", message);
  };

  return (
    <div className="ContactForm min-w-[80%] mt-4 lg:mt-12 bg-neutral-200 p-4 md:p-10 md:px-14 lg:px-24 md:w-3/4 rounded-3xl mb-16 text-xs md:text-base">
      <form onSubmit={handleSubmit} method="POST" action="#" className="grid">
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-8">
          <FormField
            value={fName}
            setFn={setFName}
            label="First Name"
            type="text"
            name="fName"
            id="fName"
            placeholder="Juan"
            required
          />
          <FormField
            value={lName}
            setFn={setLName}
            label="Last Name"
            type="text"
            name="lName"
            id="lName"
            placeholder="de La Cruz"
            required
          />
        </div>
        <FormField
          value={email}
          setFn={setEmail}
          label="Email Address"
          type="email"
          name="email"
          id="email"
          placeholder="email@domain.com"
          required
        />
        <FormField
          value={subject}
          setFn={setSubject}
          label="Subject"
          type="text"
          name="subject"
          id="subject"
          placeholder="email@domain.com"
          required
        />
        <div className="flex flex-col mb-4">
          <label htmlFor="message" className="uppercase font-medium">
            Message
          </label>
          <textarea
            className="rounded border-[1.5px] border-black px-2 py-1"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            placeholder="An inquiry, suggestion, or anything that's on your mind!"
            rows="9"
            style={{ resize: "none" }}
            required
          ></textarea>
        </div>
        <button className="justify-self-end mt-3 w-32 lg:w-[10rem] bg-black hover:bg-[#04b2bd] text-white uppercase py-3 rounded-[2rem] font-semibold tracking-wider">
          Send
        </button>
      </form>
    </div>
  );
}
