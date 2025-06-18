---
title: "Intro to Next.js Server Actions"
date: "2024-06-10"
slug: "intro-to-server-actions"
excerpt: "Simplify form submissions and data mutations in Next.js applications using Server Actions, reducing the need for manual API endpoints."
tags: ["Next.js", "Server Actions", "Web Development", "React"]
author: "Samantha Blue"
---

## What are Server Actions?

Server Actions in Next.js allow you to run server-side code directly in response to UI interactions, such as form submissions or button clicks, without manually creating API route handlers. They are built on top of React Actions.

### Basic Usage with Forms

You can define a Server Action function and pass it directly to a form's `action` prop.

```tsx
// app/submit-form/page.tsx
export default function SubmitPage() {
  async function submitData(formData: FormData) {
    'use server'; // Marks this function as a Server Action

    const name = formData.get('name') as string;
    // ... process data, e.g., save to database
    console.log('Name submitted:', name);
    // Optionally, revalidate paths or redirect
  }

  return (
    <form action={submitData}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" name="name" required />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Benefits

*   **Simplified Data Mutations:** Reduces boilerplate for creating API endpoints for simple mutations.
*   **Progressive Enhancement:** Forms work even if JavaScript is disabled (though client-side enhancements are common).
*   **Integrated with React Suspense:** Can be used with `useFormStatus` for pending states and `useFormState` for optimistic updates and error handling.

Server Actions are a powerful feature for Next.js developers, making server-side logic more tightly coupled with the components that trigger it.
