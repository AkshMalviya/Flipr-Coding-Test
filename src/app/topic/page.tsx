"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function page() {
  const [text, setText] = useState("");
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(
      "https://ap-south-1.aws.data.mongodb-api.com/app/application-0-eexgfbu/endpoint/v2/list?list=show"
    )
      .then((res) => {
        if (!res) {
          return Error("Error something wrong");
        }
        return res.json();
      })
      .then((response) => {
        console.log(response);
        setItems(response);
      });
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    console.log(text);

    setItems(items.filter((item) => item.topic.toLowerCase().includes(text)));
    if (text == "") {
      setItems(items);
    }
  };
  return (
    <div>
      <Input
        type="text"
        value={text}
        placeholder="search topics"
        onChange={(e) => {
          handleSearch(e);
        }}
        className="mx-auto p-6 w-[50%] text-xl mt-4"
      />
      <section className="grid grid-cols-4 p-4   space-x-6 space-y-4">
        {items.map((item) => (
          <Link href={"/question/" + item.topic} className="">
            <Card
              className="max-w-[600px] hover:bg-slate-300 hover:cursor-pointer hover:scale-105"
              key={item.topic}
            >
              <CardHeader>
                <CardTitle>{item?.topic}</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </section>
    </div>
  );
}
