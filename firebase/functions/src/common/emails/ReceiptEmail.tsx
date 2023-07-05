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
import { Timestamp } from "firebase-admin/firestore";
import React from "react";

import { Order, User } from "../interface";
import { InfoCell, Tailwind } from "./components";

const { parsed: env } = dotenv.config();
const BASE_URL =
  env?.FRONTEND_DEPLOYMENT_URL?.trim().split(/\s+/)[0] ||
  "http://localhost:3000";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

interface ReceiptEmailProps {
  customer: User;
  order: Pick<Order, "services" | "totalPrice" | "id" | "paidAt">;
}

/**
 * Template for Receipt Email.
 *
 * @param Props - Receipt Email props.
 * @return Receipt email template in JSX.
 */
function ReceiptEmail({
  customer = {
    uid: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },
  order = {
    id: "",
    services: [],
    totalPrice: 0,
    paidAt: Timestamp.now(),
  },
}: ReceiptEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>My Author's Perspective Receipt</Preview>

      <Tailwind>
        <Body className="bg-white font-helvetica">
          <Container className="mx-auto max-w-email pt-4">
            <Section>
              <Column>
                <Img
                  src={`${BASE_URL}/_next/image?url=%2Fimages%2Flogo.png&w=96&q=75`}
                  width="64"
                  height="64"
                  alt="My Author's Perspective Logo"
                />
              </Column>

              <Column align="right" className="table-cell">
                <Text className="font-light text-lg text-muted">Receipt</Text>
              </Column>
            </Section>
          </Container>

          <Container className="mx-auto max-w-email mt-2">
            <Section className="border-collapse border-spacing-0 bg-offwhite rounded-md">
              <Column>
                <Row>
                  <InfoCell
                    label="Customer Name"
                    value={customer.firstName + " " + customer.lastName}
                  />

                  <InfoCell label="Email" value={customer.email} isAccented />
                </Row>

                <Row>
                  <InfoCell
                    label="Receipt Issued"
                    value={(order.paidAt ?? Timestamp.now())
                      .toDate()
                      .toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                  />
                </Row>

                <Row>
                  <InfoCell
                    label="Order ID"
                    value={order.id ?? ""}
                    isAccented
                  />

                  <InfoCell
                    label="Customer ID"
                    value={customer.uid || ""}
                    isAccented
                  />
                </Row>
              </Column>
            </Section>
          </Container>

          <Container className="mx-auto max-w-email">
            <Section className="border-collapse border-spacing-0 bg-offwhite rounded-md mt-8 mb-4 h-6">
              <Text className="m-0 pl-2.5 text-sm font-medium text-muted">
                Services
              </Text>
            </Section>
          </Container>

          {order.services.map(
            ({ title, inclusions, quantity, unitPrice }, idx) => (
              <React.Fragment key={title}>
                <Container className="mx-auto max-w-email">
                  <Section key={title}>
                    <Column className="pl-3">
                      <Text className="m-0 p-0 leading-snug font-semibold text-xs">
                        {title}
                      </Text>
                      {quantity !== 1 ? (
                        <Text className="m-0 p-0 leading-snug text-muted text-xs">
                          Quantity {quantity}
                        </Text>
                      ) : null}
                      <Text className="m-0 p-0 leading-snug text-muted text-xs max-w-md">
                        {inclusions.join(", ")}
                      </Text>
                    </Column>

                    <Column align="right">
                      <Text className="m-0 leading-snug font-semibold text-xs">
                        {formatter.format(unitPrice * quantity)}
                      </Text>
                      {quantity !== 1 ? (
                        <Text className="m-0 leading-snug text-xs text-muted">
                          {formatter.format(unitPrice)} each
                        </Text>
                      ) : null}
                    </Column>
                  </Section>

                  {idx !== order.services.length - 1 ? (
                    <Container className="mx-auto max-w-email">
                      <Hr className="my-4" />
                    </Container>
                  ) : null}
                </Container>
              </React.Fragment>
            )
          )}

          <Container className="mx-auto max-w-email">
            <Hr className="mt-8 mb-0" />
            <Section align="right">
              <Column className="table-cell" align="right">
                <Text className="m-0 text-muted text-xxs font-semibold pr-8 text-right">
                  TOTAL
                </Text>
              </Column>
              <Column className="h-12 border-0 border-l border-solid border-offwhite"></Column>
              <Column className="table-cell w-24">
                <Text className="whitespace-nowrap text-right font-semibold text-base mr-3">
                  {formatter.format(order.totalPrice)}
                </Text>
              </Column>
            </Section>
          </Container>

          <Container className="mx-auto max-w-email">
            <Hr className="mt-0 mb-20" />
          </Container>

          <Container className="mx-auto max-w-email pb-8">
            <Text className="text-center my-4 text-xs text-muted">
              Privacy: We use a <span className="text-accent">Customer ID</span>{" "}
              to provide reports to developers.
            </Text>

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

export default ReceiptEmail;
