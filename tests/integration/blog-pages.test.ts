import { describe, it, expect } from "vitest";
import { setup, $fetch, createPage } from "@nuxt/test-utils/e2e";

describe("Blog Pages Integration Tests", async () => {
  await setup({
    // test context options
  });

  describe("Blog Index Page (/blog)", () => {
    it("should render blog index page successfully", async () => {
      const html = await $fetch("/blog");

      expect(html).toContain("Blog");
      expect(html).toContain("Discover articles");
      expect(html).toContain("Search articles");
    });

    it("should display blog posts in grid layout", async () => {
      const html = await $fetch("/blog");

      // Check for blog post grid structure
      expect(html).toContain("grid gap-6");
      expect(html).toContain("UCard");
    });

    it("should include search and filter functionality", async () => {
      const html = await $fetch("/blog");

      expect(html).toContain("Search articles");
      expect(html).toContain("All Categories");
      expect(html).toContain("All Tags");
    });

    it("should include pagination when needed", async () => {
      const html = await $fetch("/blog");

      // Check for pagination component (may not be visible if few posts)
      expect(html).toMatch(/UPagination|pagination/i);
    });

    it("should have proper SEO meta tags", async () => {
      const html = await $fetch("/blog");

      expect(html).toContain("<title>");
      expect(html).toContain("Blog - Latest Articles");
      expect(html).toContain("og:title");
      expect(html).toContain("og:description");
    });
  });

  describe("Individual Blog Post Pages (/blog/[slug])", () => {
    it("should render existing blog post successfully", async () => {
      // Test with a known blog post
      const html = await $fetch("/blog/getting-started-with-nuxt");

      expect(html).toContain("Getting Started with Nuxt 3");
      expect(html).toContain("blog-content");
    });

    it("should display post metadata correctly", async () => {
      const html = await $fetch("/blog/getting-started-with-nuxt");

      // Check for metadata elements
      expect(html).toContain("John Developer"); // author
      expect(html).toContain("tutorial"); // category
      expect(html).toContain("#nuxt"); // tags
      expect(html).toContain("min read"); // reading time
    });

    it("should include breadcrumb navigation", async () => {
      const html = await $fetch("/blog/getting-started-with-nuxt");

      expect(html).toContain("Home");
      expect(html).toContain("Blog");
      expect(html).toContain("Getting Started with Nuxt 3");
    });

    it("should include previous/next navigation", async () => {
      const html = await $fetch("/blog/getting-started-with-nuxt");

      // Check for navigation buttons (may not always be present)
      expect(html).toMatch(/Previous Post|Next Post|Back to All Posts/);
    });

    it("should render markdown content properly", async () => {
      const html = await $fetch("/blog/getting-started-with-nuxt");

      // Check for properly rendered markdown elements
      expect(html).toContain("<h1>");
      expect(html).toContain("<h2>");
      expect(html).toContain("<p>");
      expect(html).toContain("<code>");
    });

    it("should return 404 for non-existent posts", async () => {
      try {
        await $fetch("/blog/non-existent-post");
        expect.fail("Should have thrown 404 error");
      } catch (error: any) {
        expect(error.response?.status || error.statusCode).toBe(404);
      }
    });

    it("should have proper SEO meta tags for individual posts", async () => {
      const html = await $fetch("/blog/getting-started-with-nuxt");

      expect(html).toContain("<title>");
      expect(html).toContain("Getting Started with Nuxt 3");
      expect(html).toContain("og:title");
      expect(html).toContain("og:type");
      expect(html).toContain("article");
    });
  });

  describe("Custom Content Components", () => {
    it("should render custom components in markdown", async () => {
      const html = await $fetch("/blog/nuxt-content-components-demo");

      // Check for custom component rendering
      expect(html).toContain("ProseAlert");
      expect(html).toContain("ProseCallout");
    });

    it("should handle component props correctly", async () => {
      const html = await $fetch("/blog/nuxt-content-components-demo");

      // Check for component-specific styling based on props
      expect(html).toContain("bg-blue-50"); // info alert
      expect(html).toContain("bg-yellow-50"); // warning alert
      expect(html).toContain("bg-red-50"); // error alert
      expect(html).toContain("bg-green-50"); // success alert
    });
  });
});
