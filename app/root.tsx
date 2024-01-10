import type {
  ActionFunctionArgs,
  LinksFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";

import styles from "./tailwind.css";
import { parse } from "@conform-to/zod";
import { ClientHintCheck, getHints } from "./utils/hints";
import { Theme, getTheme, setTheme } from "./utils/theme.server";
import { useNonce } from "./utils/nonce-provider";
import { Logo } from "./components/Logo";
import { useTheme } from "./components/themeSwitching/useTheme";
import { ThemeSwitch } from "./components/themeSwitching/themeSwitch";
import { ThemeFormSchema } from "./components/themeSwitching/themeFormSchema";
import { Navigation } from "./components/Navigation";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  {
    rel: "icon",
    type: "image/png",
    href: "/favicons/favicon-dark.png",
  },
  {
    rel: "icon",
    type: "image/png",
    href: "/favicons/favicon-light.png",
    media: "(prefers-color-scheme: dark)",
  },
];

function Document({
  children,
  nonce,
  theme = "light",
}: Readonly<{
  children: React.ReactNode;
  nonce: string;
  theme?: Theme;
}>) {
  return (
    <html lang="en" className={`${theme} h-full overflow-x-hidden`}>
      <head>
        <ClientHintCheck nonce={nonce} />
        <Meta />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Links />
      </head>
      <body className="bg-paper dark:bg-primary text-primary dark:text-paper">
        {children}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
        <LiveReload nonce={nonce} />
      </body>
    </html>
  );
}

export default function App() {
  const data = useLoaderData<typeof loader>();
  const nonce = useNonce();
  const theme = useTheme();

  return (
    <Document nonce={nonce} theme={theme}>
      <div className="flex h-screen flex-col justify-between">
        <header className="container py-6 mx-auto">
          <Navigation />
        </header>

        <div className="flex-1 px-6 lg:px-6">
          <Outlet />
        </div>

        <div className="container flex justify-between pb-5 px-6 lg:px-0 mx-auto ">
          <Logo />
          <ThemeSwitch userPreference={data.requestInfo.userPrefs.theme} />
        </div>
      </div>
    </Document>
  );
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const submission = parse(formData, {
    schema: ThemeFormSchema,
  });
  if (submission.intent !== "submit") {
    return json({ status: "idle", submission } as const);
  }
  if (!submission.value) {
    return json({ status: "error", submission } as const, { status: 400 });
  }
  const { theme } = submission.value;

  const responseInit = {
    headers: { "set-cookie": setTheme(theme) },
  };
  return json({ success: true, submission }, responseInit);
}

export async function loader({ request }: LoaderFunctionArgs) {
  return json({
    requestInfo: {
      hints: getHints(request),
      path: new URL(request.url).pathname,
      userPrefs: {
        theme: getTheme(request),
      },
    },
  });
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Document nonce="">
        <div className="flex h-screen flex-col justify-between">
          <header className="container py-6 mx-auto">
            <Navigation />
          </header>

          <div className="flex-1 px-6 lg:px-6">
            <div className="text-center">
              <h1 className="font-display text-fl-xl mb-fl-xs">
                {error.status} {error.statusText}
              </h1>
              <p>{error.data}</p>
            </div>
          </div>
        </div>
      </Document>
    );
  } else if (error instanceof Error) {
    return (
      <Document nonce={""}>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </Document>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
