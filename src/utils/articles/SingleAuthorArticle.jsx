import React from 'react'
import { Row, Hr, Section, Img, Heading, Text, Link } from "@react-email/components";

function SingleAuthorArticle() {
  return (

<Row>
  <Hr className="my-[16px] !border-gray-300" />
  <Section className="mt-[5px] inline-block max-h-[48px] max-w-[48px] text-left">
    <Img
      alt="Steve Jobs"
      className="block h-[48px] w-[48px] rounded-full object-cover object-center"
      height={48}
      src="https://react.email/static/steve-jobs.jpg"
      width={48}
    />
  </Section>
  <Section className="ml-[18px] inline-block max-w-[120px] text-left align-top">
    <Heading
      as="h3"
      className="m-[0px] text-[14px] font-medium leading-[20px] text-gray-800"
    >
      Steve Jobs
    </Heading>
    <Text className="m-[0px] text-[12px] font-medium leading-[14px] text-gray-500">
      Co-Founder & CEO
    </Text>
    <Section className="mt-[4px]">
      <Link className="inline-flex h-[12px] w-[12px]" href="#">
        <Img
          alt="X"
          src="https://react.email/static/x-icon.png"
          style={{ height: "12px", width: "12px" }}
        />
      </Link>
      <Link className="ml-[8px] inline-flex h-[12px] w-[12px]" href="#">
        <Img
          alt="LinkedIn"
          src="https://react.email/static/in-icon.png"
          style={{ height: "12px", width: "12px" }}
        />
      </Link>
    </Section>
  </Section>
</Row>
  )
}

export default SingleAuthorArticle