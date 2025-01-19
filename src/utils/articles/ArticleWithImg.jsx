import React from 'react'
import { Section, Img, Text, Heading, Button } from "@react-email/components";

function ArticleWithImg() {
  return (

<Section className="my-[16px]">
  <Img
    alt="Herman Miller Chair"
    className="w-full rounded-[12px] object-cover"
    height="320"
    src="https://react.email/static/herman-miller-chair.jpg"
  />
  <Section className="mt-[32px] text-center">
    <Text className="my-[16px] text-[18px] font-semibold leading-[28px] text-indigo-600">
      Our new article
    </Text>
    <Heading
      as="h1"
      className="m-0 mt-[8px] text-[36px] font-semibold leading-[36px] text-gray-900"
    >
      Designing with Furniture
    </Heading>
    <Text className="text-[16px] leading-[24px] text-gray-500">
      Unleash your inner designer as we explore how furniture plays a vital
      role in creating stunning interiors, offering insights into choosing the
      right pieces, arranging them harmoniously, and infusing your space with
      personality.
    </Text>
    <Button
      className="mt-[16px] rounded-[8px] bg-indigo-600 px-[40px] py-[12px] font-semibold text-white"
      href="https://react.email"
    >
      Read more
    </Button>
  </Section>
</Section>
  )
}

export default ArticleWithImg