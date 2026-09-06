---
title: "Learning Terraform: A Practical Start with Infrastructure as Code"
description: "My first steps with Terraform, from declarative infrastructure to a safe init, validate, and plan workflow."
date: 2026-09-06
author: "Cristian Stalin Paredes Sánchez"
tags:
  - terraform
  - infrastructure-as-code
  - devops
  - ci-cd
category: learning
image: /og-default.svg
draft: false
---

# Learning Terraform: A Practical Start with Infrastructure as Code

As a backend-focused Full Stack Engineer, I am expanding my DevOps skills with Terraform and Infrastructure as Code (IaC). The goal is not to replace application development; it is to make the infrastructure that supports an application repeatable, reviewable, and easier to evolve with a team.

Terraform lets us describe the desired infrastructure in configuration files. Instead of relying on manual console changes, the configuration becomes part of the project history and can move through the same review process as application code.

## Why Infrastructure as Code Matters

IaC gives a team a clear description of the resources an application needs. That brings a few practical benefits:

- **Consistency:** environments can be created from the same configuration.
- **Reviewability:** infrastructure changes can be discussed in pull requests before they are applied.
- **Repeatability:** the documented process does not depend on one person's memory.
- **Safer delivery:** a plan shows intended changes before they affect infrastructure.

## A Small First Configuration

This example uses Terraform's local provider. It is useful for learning the workflow because it creates a local file rather than a cloud resource.

```hcl [main.tf]
terraform {
  required_providers {
    local = {
      source = "hashicorp/local"
    }
  }
}

resource "local_file" "welcome" {
  filename = "${path.module}/hello.txt"
  content  = "Hello from Terraform"
}
```

## The Workflow I Am Practising

After writing or cloning a configuration, I start with these commands:

```bash
terraform fmt
terraform init
terraform validate
terraform plan
```

`terraform init` prepares the working directory and installs the providers and modules referenced by the configuration. `terraform validate` checks that the initialized configuration is syntactically valid and internally consistent. Finally, `terraform plan` previews proposed changes without changing real infrastructure. [HashiCorp's Terraform workflow documentation](https://developer.hashicorp.com/terraform/tutorials/cli/init) describes the same initialize, plan, and apply sequence.

I review the plan carefully before applying it. In a production workflow, this review is especially important because an apply can create, update, or delete managed resources.

## What I Am Learning Next

My next steps are to model reusable modules, manage variables and environments, understand remote state, and integrate validation and plans into CI/CD pipelines. The principle I want to keep is simple: infrastructure changes deserve the same care, review, and automation as application changes.
