import { useState } from "react";
import FormField from "./FormField";
import { sendContactEmail } from "@/services/api/contact";
import { notifySuccess, notifyError } from "@/helpers/notification.helper.";
import isValid from "../../helpers/validation.helper";

export default function ContactForm() {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isFetching, setIsFetching] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      isFetching ||
      !isValid.firstName(fName) ||
      !isValid.lastName(lName) ||
      !isValid.email(email) ||
      !isValid.subject(subject) ||
      !isValid.message(message)
    ) {
      return;
    }

    const payload = {
      firstName: fName,
      lastName: lName,
      email,
      subject,
      message,
    };

    setIsFetching(true);
    const { error } = await sendContactEmail(payload);
    if (error) {
      setIsFetching(false);
      return notifyError(error.message);
    } else {
      notifySuccess("Message sent successfully!");
      setFName("");
      setLName("");
      setEmail("");
      setSubject("");
      setMessage("");
      setIsFetching(false);
    }
  };

  return (
    <div className="shadow-lg min-w-[80%] mt-4 lg:mt-12 bg-neutral-200 p-4 md:p-10 md:px-14 lg:px-24 md:w-3/4 rounded-3xl mb-16 text-xs md:text-base">
      <form onSubmit={handleSubmit} method="POST" action="#" className="grid">
        <fieldset disabled={isFetching}>
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
            placeholder="The Email Subject"
            required
          />
          <div className="flex flex-col mb-4">
            <label htmlFor="message" className="uppercase font-medium">
              Message
            </label>
            <textarea
              className="rounded-xl border-[1.5px] border-black px-3 py-2"
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
        </fieldset>
        <button
          disabled={isFetching}
          className="justify-self-end mt-3 w-32 lg:w-[10rem] bg-black hover:bg-[#04b2bd] disabled:bg-[#04b2bd] text-white uppercase py-3 rounded-3xl font-semibold tracking-wider"
        >
          Send
        </button>
      </form>
    </div>
  );
}
