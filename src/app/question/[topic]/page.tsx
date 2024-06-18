"use client";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

export default function page({ params }: { params: { topic: string } }) {
  const [question, setQuestion] = useState([]);
  console.log(params.topic);
  useEffect(() => {
    fetch(
      "https://ap-south-1.aws.data.mongodb-api.com/app/application-0-eexgfbu/endpoint/v2/api?topicwise=" +
        params.topic
    )
      .then((res) => res.json())
      .then((response) => {
        setQuestion(response.questions[0].data);
      });
  }, []);
  return (
    <div>
      {question.map((item) => (
        <Card>
          <h3>{item.question}</h3>
          <p>{item.options.optionA}</p>
          <p>{item.options.optionB}</p>
          <p>{item.options.optionC}</p>
          <p>{item.options.optionD}</p>
        </Card>
      ))}
    </div>
  );
}
