import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa";
import { TriangleAlert } from "lucide-react"

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { SignInFlow } from "../types";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react"
import { redirect } from "next/navigation";

interface SignInCardProps {
  setState: (state: SignInFlow) => void;
}

const SignInCard = ({ setState }: SignInCardProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCredentialsSignIn = (formData: FormData) => {
    setIsLoading(true);
    signIn("credentials", { redirect: false, email: email, password: password })
      .then((res) => {
        console.log(res)
        if (res?.error) {
          setError("Invalid email or password!")
        }
        else {
          redirect("/")
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleProviderSignIn = (value: "google" | "github") => {
    setIsLoading(true);
    signIn(value, { redirectTo: "/" })
  }

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="font-bold text-2xl">
          Login to continue
        </CardTitle>
        <CardDescription>
          Use your email or another servise to continue
        </CardDescription>
      </CardHeader>

      {!!error && (
        <div className="bg-destructive/10 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
          <TriangleAlert className="size-4" />
          <p>{error}</p>
        </div>
      )}

      <CardContent className="space-y-5 px-0 pb-0">
        <form className="space-y-2.5" action={handleCredentialsSignIn}>
          <Label htmlFor="credentials-email" className="mb-0">Email</Label>
          <Input
            disabled={isLoading}
            value={email}
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="credentials-email"
            name="email"
            autoComplete="off"
            required
          />
          <Label htmlFor="credentials-password" className="mb-0">Password</Label>
          <Input
            disabled={isLoading}
            value={password}
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="credentials-password"
            name="password"
            required
          />
          <Button type="submit" className="w-full" size="lg" disabled={isLoading}>Continue</Button>
        </form>



        <Separator />

        <div className="flex flex-col gap-y-2.5">
          <Button
            disabled={isLoading}
            onClick={() => handleProviderSignIn("google")}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FcGoogle className="size-5" />
            Continue with Google</Button>
          <Button
            disabled={isLoading}
            onClick={() => handleProviderSignIn("github")}
            variant="outline"
            size="lg"
            className="w-full relative"
          >
            <FaGithub className="size-5" />
            Continue with Github</Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Don't have an account?
          <span
            onClick={() => setState("signUp")}
            className="text-sky-700 hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </CardContent>
    </Card>
  );
}

export default SignInCard;