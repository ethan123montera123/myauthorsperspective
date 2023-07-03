import {
  Body,
  Column,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import dotenv from "dotenv";
import { InfoCell, Tailwind } from "./components";

const { parsed: env } = dotenv.config();
const baseUrl = env?.VERCEL_DEPLOYMENT_URL;

interface ContactEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
  sentAt?: Date;
}

/**
 * Template for Contact Email.
 *
 * @param Props - Contact Email props.
 * @return Contact email template in JSX.
 */
function ContactEmail({
  name = "",
  email = "",
  subject = "",
  message = "",
  sentAt = new Date(),
}: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        {name} Concern - {subject}
      </Preview>

      <Tailwind>
        <Body className="bg-white font-helvetica">
          <Container className="mx-auto max-w-email pt-4">
            <Section>
              <Column>
                <Img
                  src={`${baseUrl}/_next/image?url=%2Fimages%2Flogo.png&w=96&q=75`}
                  width="64"
                  height="64"
                  alt="My Author's Perspective Logo"
                />
              </Column>

              <Column align="right" className="table-cell">
                <Text className="font-light text-lg text-muted">Contact</Text>
              </Column>
            </Section>
          </Container>

          <Container className="mx-auto max-w-email mt-2">
            <Section className="border-collapse border-spacing-0 bg-offwhite rounded-md">
              <Column>
                <Row>
                  <InfoCell label="Customer Name" value={name} />
                  <InfoCell label="Email" value={email} isAccented />
                </Row>

                <Row>
                  <InfoCell
                    label="Contact Sent"
                    value={sentAt.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  />
                </Row>

                <Row>
                  <InfoCell label="Subject" value={subject} />
                </Row>
              </Column>
            </Section>
          </Container>

          <Container className="mx-auto max-w-email">
            <Section className="border-collapse border-spacing-0 bg-offwhite rounded-md mt-8 mb-4 h-6">
              <Text className="m-0 pl-2.5 text-sm font-medium text-muted">
                Message
              </Text>
            </Section>
          </Container>

          <Container className="mx-auto max-w-email">
            <Section className="border-collapse border-spacing-0 rounded-md mb-4 h-6">
              <Text className="m-0 pl-2.5 text-sm font-medium">{message}</Text>
            </Section>
          </Container>

          <Container className="mx-auto max-w-email">
            <Hr className="mt-0 mb-6" />
          </Container>

          <Container className="mx-auto max-w-email pb-8">
            <Text className="mt-4 text-center text-xs text-muted">
              Copyright © 2023 My Author's Perspective. <br />{" "}
              <span className="text-accent">All rights reserved</span>
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}

export default ContactEmail;
