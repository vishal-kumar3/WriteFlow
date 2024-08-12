import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

type props = {};

export const AnalyticsCard = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>_</CardTitle>
        <CardDescription>7-day page view</CardDescription>
      </CardHeader>
    </Card>
  );
};

export const InfoCard = () => {
  return (
    <Card className="min-w-[30%]">
      <CardHeader>
        <div className="size-[40px] rounded-full bg-blue-400"></div>
        <h1 className="font-semibold">Name&apos;s Flow Info</h1>
        <div className="text-sm text-muted-foreground flex justify-around px-2 py-3 bg-slate-200/40 rounded-md">
          <div>
            <div>_</div>
            <div>Article</div>
          </div>
          <div>
            <div>_</div>
            <div>Follower</div>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}

export const RecentArticle = () => {
  return (
    <Card className="min-w-[65%]">
      <CardHeader>
        <div className="size-[40px] bg-slate-200/50 rounded-full mx-auto"></div>
        <CardTitle className="mx-auto">No recent articles</CardTitle>
        <CardDescription className="mx-auto">Your recently published article will show up here.</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-center w-full">
        <Button>Write New Flow</Button>
      </CardFooter>
    </Card>
  )
}

const DashboardPage = (props: props) => {
  return (
    <div className="m-10">
      <div className="border-b">
        <p className="text-4xl font-semibold">Dashboard</p>
        <p className="opacity-50 mt-1 mb-6">
          Learn more about your new dashboard and get started
        </p>
      </div>

      <div className="my-10">
        <div className="flex justify-between items-center">
          <h1 className="font-semibold mb-4">Your WriteFlow Stats</h1>
          <p className="text-blue-400">Go to analytics -</p>
        </div>
        <div className="flex gap-10 justify-between items-center">
          <AnalyticsCard />
          <AnalyticsCard />
          <AnalyticsCard />
        </div>
      </div>

      <div>
        <h1 className="font-semibold">Info</h1>
        <div className="flex justify-between gap-10">
          <InfoCard />
          <RecentArticle />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
