import fs from "fs";
import path from "path";
import { promises as dns } from "dns";
import matter from "gray-matter";

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFiles(filepath: fs.PathOrFileDescriptor) {
  let rawContent = fs.readFileSync(filepath, "utf-8");
  return matter(rawContent);
}

function getMDXData(dir: string) {
  let mdxFiles = getMDXFiles(dir);

  return mdxFiles.map((file) => {
    let { data: metadata, content } = readMDXFiles(path.join(dir, file));
    let slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      content,
    };
  });
}

export function getTermsOfServices() {
  return getMDXData(
    path.join(
      process.cwd(),
      "src",
      "app",
      "[locale]",
      "(blog)",
      "blog",
      "(others)",
      "terms-of-services",
    ),
  );
}

export function getPrivacyPolicy() {
  return getMDXData(
    path.join(
      process.cwd(),
      "src",
      "app",
      "[locale]",
      "(blog)",
      "blog",
      "(others)",
      "privacy-policy",
    ),
  );
}

export function getBlogPosts() {
  return getMDXData(path.resolve(process.cwd(), "src/contents"));
}

export function formatDate(
  date: string,
  localeVar: string,
  includeRelative = false,
) {
  let currentDate = new Date();

  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }

  let targetDate = new Date(date);

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  let daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}m ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  let fullDate = targetDate.toLocaleString(localeVar, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}

export async function validateEmailAddress(emailAddress: string) {
  const invalidDomains = [
    "tempmail.com",
    "example.com",
    "email.com",
    "eamil.com",
    "test.com",
  ];
  const [user, domain] = emailAddress.split("@");

  if (invalidDomains.includes(domain)) {
    return false;
  }

  try {
    const mxRecords = await dns.resolveMx(domain);

    if (!mxRecords || mxRecords.length === 0) {
      return false;
    }
    return true;
  } catch (error: any) {
    console.error(error.code);
  }
}
