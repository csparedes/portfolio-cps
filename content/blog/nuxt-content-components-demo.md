---
title: "Nuxt Content Components Demo"
description: "Demonstration of custom components available in Nuxt Content markdown files"
date: 2024-01-25
author: "Content Team"
tags: ["nuxt", "content", "components", "demo"]
category: "demo"
draft: false
---

# Nuxt Content Components Demo

This post demonstrates the custom components available in our Nuxt Content setup.

## Alert Components

You can use different types of alerts in your content:

::ProseAlert{type="info" title="Information"}
This is an informational alert. Use it to highlight important information.
::

::ProseAlert{type="warning" title="Warning"}
This is a warning alert. Use it to warn users about potential issues.
::

::ProseAlert{type="error" title="Error"}
This is an error alert. Use it to highlight critical issues or errors.
::

::ProseAlert{type="success" title="Success"}
This is a success alert. Use it to confirm successful operations.
::

## Callout Component

Use callouts to highlight key insights or tips:

::ProseCallout{title="Pro Tip"}
This is a callout component that draws attention to important tips or insights. It's perfect for highlighting best practices or key takeaways.
::

## Optimized Images

Images are automatically optimized using @nuxt/image:

::ProseImg{src="/blog/nuxt-getting-started.jpg" alt="Nuxt.js Getting Started" width="800" height="400"}
::

## Code Blocks with Enhanced Features

Here's a JavaScript example with syntax highlighting:

```javascript
// Example of async/await in JavaScript
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}
```

Vue.js component example:

```vue
<template>
  <div class="user-profile">
    <h2>{{ user.name }}</h2>
    <p>{{ user.email }}</p>
    <UButton @click="updateProfile">Update Profile</UButton>
  </div>
</template>

<script setup>
const user = ref({
  name: "John Doe",
  email: "john@example.com",
});

const updateProfile = () => {
  // Update profile logic
  console.log("Updating profile...");
};
</script>
```

## Regular Markdown Features

All standard markdown features work as expected:

### Lists

- Unordered list item 1
- Unordered list item 2
  - Nested item
  - Another nested item

1. Ordered list item 1
2. Ordered list item 2
3. Ordered list item 3

### Blockquotes

> This is a blockquote. It's useful for highlighting quotes or important statements from other sources.

### Tables

| Feature             | Status | Notes                            |
| ------------------- | ------ | -------------------------------- |
| Syntax Highlighting | ✅     | Multiple languages supported     |
| Custom Components   | ✅     | Alert, Callout, Image components |
| Image Optimization  | ✅     | Automatic WebP conversion        |
| Dark Mode           | ✅     | Full dark mode support           |

### Links and Emphasis

You can use [links](https://nuxt.com), **bold text**, _italic text_, and `inline code`

---

This demonstrates the full range of content capabilities available in our Nuxt Content setup!
