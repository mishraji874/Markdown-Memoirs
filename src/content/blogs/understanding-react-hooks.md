---
title: "Understanding React Hooks"
date: "2024-07-18"
slug: "understanding-react-hooks"
excerpt: "A beginner's guide to React Hooks like useState and useEffect, simplifying state and side effects in functional components."
tags: ["React", "JavaScript", "Frontend", "Hooks"]
author: "Alex Johnson"
---

## What are React Hooks?

React Hooks are functions that let you “hook into” React state and lifecycle features from function components. Hooks don’t work inside classes — they let you use React without classes.

### `useState`

The `useState` hook is used to add state to functional components.

```javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

### `useEffect`

The `useEffect` hook lets you perform side effects in functional components. It's a close replacement for `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` in React classes.

```javascript
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```
Hooks are a powerful addition to React, making functional components more capable than ever.
