export interface EmailTemplate {
  subject: string;
  bodyHtml: string;
  bodyText: string;
}

export function getWelcomeEmailTemplate(userName: string): EmailTemplate {
  const subject = `Welcome to StackForge, ${userName}! 🚀`;
  const bodyText = `Hi ${userName}, welcome to StackForge! Master senior software engineering concepts through interactive learning graphs, real-world projects, and grounded AI mentoring. Get started at https://stackforge.dev/dashboard`;

  const bodyHtml = `
    <div style="font-family: sans-serif; background-color: #020617; color: #f8fafc; padding: 40px; border-radius: 16px;">
      <h1 style="color: #38bdf8;">Welcome to StackForge, ${userName}! 🚀</h1>
      <p style="color: #94a3b8; font-size: 16px;">
        You've joined an elite learning platform built for senior software engineers.
      </p>
      <div style="margin: 30px 0;">
        <a href="https://stackforge.dev/dashboard" style="background: linear-gradient(to right, #38bdf8, #6366f1); color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">
          Go to Your Dashboard
        </a>
      </div>
      <p style="color: #64748b; font-size: 14px;">
        Happy coding,<br/>The StackForge Team
      </p>
    </div>
  `;

  return { subject, bodyHtml, bodyText };
}
