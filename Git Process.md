# Table of Contents

- [List base features of GitHub](#list-base-features-of-github)
- [STARLAB Augments](#starlab-augments)
- [Core Branches](#core-branches)
- [User Flows](#user-flows)
  - [Inserting new Epics](#inserting-new-epics)
  - [Creating new Features (User Stories)](#creating-new-features-user-stories)
  - [Creating Bug Tickets](#creating-bug-tickets)
  - [Start coding](#start-coding)
  - [Using GitHub Actions](#using-github-actions)
  - [Creating Pull Requests](#creating-pull-requests)
  - [When ready for release (e.g. from 0.0.0 to 0.1.0)](#when-ready-for-release-eg-from-000-to-010)
- [How to on-board for existing repositories](#how-to-on-board-for-existing-repositories)
  - [Templates](#templates)
  - [Telegram integration](#telegram-integration)
  - [Pre-commit hooks](#pre-commit-hooks)

# **List base features of github**

| Feature                 | Description                                                                                                                                                                    |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Repositories            | Storage spaces for projects where all the files, revision history, and metadata are kept.<br />Each project typically has its own repository.                                  |
| Readme.md               | A markdown file in the repository that provides an overview of the project.<br />It often includes installation instructions, usage examples, and contact information          |
| Branches                | Separate lines of development within a repository.<br />Branches allow multiple people to work on different features or fixes simultaneously                                   |
| Commits                 | Snapshots of changes made to the repository.<br />Each commit includes a commit message explaining what changes were made and why                                              |
| Pull Requests           | Proposals to merge changes from one branch into another.<br />Pull requests facilitate code review, discussion, and quality control before integrating new code                |
| Issues                  | Tracking tools for bugs, tasks, and enhancements.<br />Users can open, discuss, and close issues to manage and organize work on the project                                    |
| Discussions             | Forums within a repository for community conversations.<br />Discussions can be used for brainstorming, Q&A, and general topic discussions                                     |
| Wikis                   | Collaborative documentation spaces within a repository.<br />Wikis are used to provide detailed information and documentation about the project                                |
| Projects                | Kanban-style boards for project management.<br />Projects can be used to organize and track progress on tasks, issues, and pull requests                                       |
| Milestones              | Grouping issues and pull requests into significant points in the project’s timeline.<br />Milestones help track progress towards large goals or releases                      |
| Git Workflows           | Prescribed methods for using Git and GitHub together to manage and streamline development processes                                                                            |
| Dependabot              | Automated tool that checks dependencies for vulnerabilities and suggests updates.<br />Dependabot helps keep projects secure by managing dependency updates                    |
| Branch Protection Rules | Settings that enforce certain workflows or approvals before a branch can be merged.<br />These rules help maintain the integrity of the main codebase                          |
| Git Pre-Commits         | Scripts that run automatically before a commit is finalized.<br />Pre-commit hooks can enforce code standards, run tests, or perform other checks                              |
| Github Pages and Wiki   | GitHub Pages allows users to host static websites directly from their repositories.<br />Wikis provide a collaborative space for project documentation and information sharing |

# STARLAB Augments

| Feature          | Augments                                                  |
| ---------------- | --------------------------------------------------------- |
| Issues           | Template for Bugs/Features/Epics                          |
| Pull Requests    | Template for Pull Requests                                |
| Pre-Commit Hooks | Enforce Git conventions (feat, fix, docs, chores, etc.)   |
| Branches         | Release & Dev                                             |
| Release          | Automated Release Manager (requires PR w Git Conventions) |
| Monitoring       | Telegram Notif: Issues, PRs, Git Commits                  |
| Git Projects     | Data fields: Status, Priority, Size, Sprint (2 Weeks)     |

# Core Branches

When working between branches or creating a new one, it's best to standardize the naming convention for branch names to help developers understand what each branch is for.

Please note that we will be using the Git-flow strategy for managing releases. For more information [Click Here](https://numergent.com/2016-12/Branching-workflow-git-flow-and-github-flow.html)

| Branch    | Description                                                                                                                                                                                                                                                                     | Usage                                                                                                                                                |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `develop` | The default branch where all ongoing development work converges.<br />All feature/issue-related branches will be branched off from this branch,<br /> and when it's ready for release, a release instance branch<br />will be branched off here | Create feature/fix branches<br />from here and merge them<br />back here once completed<br />and tested |
| `feat/*` | Feature branches, created from the dev branch to isolate<br />development of a specific feature without commits interfering with<br />the default branch | Create a new branch with<br /> `feat/` prefix. All development<br />work for related issue to be<br />worked on here |
| `fix/*`  | Bug fix branches, are similar to feature branches but are<br /> specifically dedicated to fixing bugs in the codebase | Create a new branch with<br />`fix/` prefix. All bug fix<br />work for a related issue to be<br />worked on here |
| `release`   | Release branch contains the all stable versions of the code.<br />When the dev branch is ready to be released with a new tag,<br />the dev branch creates a release-* instance branch and has <br />2 PRs to merge it into both release and dev branch with the<br />changelog | To keep track from a higher<br />level the current progress<br />of the repository and the<br />states ready to be deployed<br />into production env |
| `release-*` | The release instance branch, this is used to create the<br />current release and be merged into release and dev branch.<br />This is part of the git-flow strategy mentioned above and <br />helps to keep the release and dev branch synced                                   | To create the changelog.md<br />after branching from dev<br />and to create the <br />pull requests to merge into<br />both release and dev branch |

![Git Branches](.github/assets/gitbranches.png)

# User Flows

## Inserting new Epics

1. Navigate to issues page > milestones (top right)
2. Click on "New milestone"
3. Fill in the details
4. Click "Create milestone"

## Creating new Features (User Stories)

1. Via Milestone

   * Navigate to milestones via issues
   * Click on the desired Epic
   * Create "New issue"
   * Select Feature Template
   * Fill in the details (Description, Labels, Projects)
2. Via Project Board

   * Click "Add Item" under desired column
   * Enter name to create Draft
   * Click inside the new issue
   * Edit and add /template for the feature template
   * Add the labels
   * Add the Epic assigned
   * Add the sprint

## Creating Bug Tickets

1. Via Project Board
   * Click "Add Item" under desired column
   * Enter name to create Draft
   * Click inside the new issue
   * Edit and add /template for the bug template
   * Add the labels
   * Add the sprint

## Start coding

1. Via Issue
   * Click on issue
   * Click "Create a branch"
   * Ensure the branch source is "develop"
   * Create a new branch while adhering to the naming convention (`<prefix>/<description>`) and in [kebab case](https://developer.mozilla.org/en-US/docs/Glossary/Kebab_case).
     * `feat/home-page`
     * `feat/audio-player`
     * `fix/increase-login-throttle`
     * `fix/menu-item-styling`
     * `chore/component-structure`
     * `chore/update-readme`
     * `refactor/notifications`
     * `refactor/login-service`
   * When committing adhere to the following convention (`<type>: <description>`):
     * `feat: add welcome page root component`
     * `chore: update react router to include welcome page`
     * `fix: handle control request race condition`
     * `style: add padding to buttons`
   * Ensure your staged changes have been linted and formatted
     ```bash
     git add .
     git commit -m "chore: update react router to include welcome page"
     git push origin feat/home-page
     ```
2. Via CLI
   * Ensure you are at the `develop` branch and it's up-to-date with the remote repository

     ```bash
        git fetch
        git checkout dev
        git pull origin dev
     ```
   * Create a new branch while adhering to the naming convention (`<type>/<description>`) and in [kebab case](https://developer.mozilla.org/en-US/docs/Glossary/Kebab_case).

     * `feat/home-page`
     * `feat/audio-player`
     * `fix/increase-login-throttle`
     * `fix/menu-item-styling`
     * `chore/component-structure`
     * `chore/update-readme`
     * `refactor/notifications`
     * `refactor/login-service`

     ```bash
        git checkout -b feat/home-page
     ```
   * After creating the branch, go to the issue board and link that branch to that issue
   * When committing adhere to the following convention (`<type>: <description>`):

     * `feat: add welcome page root component`
     * `chore: update react router to include welcome page`
     * `fix: handle control request race condition`
     * `style: add padding to buttons`

     ```bash
        git add .
        git commit -m "feat: add home page component"
        git add .
        git commit -m "chore: update react router to include welcome page"
        git push origin feat/home-page
     ```
   * Ensure your latest commit has gone through the configured code/commit linting and formatting when pushing your local repository to the remote repository

## Using Github Actions

There are multiple use cases for github actions which can be project specific. For example, Actions can be executed upon new pushes which can help with

* Code Linting
* Build
* Running test cases

For better documentation on how to get started: [Click Here](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions)

## Creating Pull Requests

1. Developer
   1. Always set PR target branches to `develop`
   2. PR Title MUST follow git conventions:
      - "`feat: add welcome page`"
   3. PRs must be approved by at least one reviewer before merging
   4. Upon approval, the PR is to be merged using `Squash and Merge` merge option
2. Reviewer
   1. Receive a notification via telegram on a new PR
   2. Review the code
   3. Ensure no bad smells and all tests pass
   4. Approve PR

## When ready for release (e.g. from 0.0.0 to 0.1.0):

1. Create a new release version branch (e.g. `git checkout -b release-0.1.0`)
2. Merge develop into `release-0.1.0` branch
3. Add a commit to update changelog (can be auto-generated)
4. Push to remote
5. Create PRs to merge into:
   5a. release branch
   5b. develop branch
6. Use `Merge Commits` as the merge option for both PRs to maintain mirror of develop commit history with release branch


# How to on-board for existing repositories

For existing repositories, each section below describes how to add the features into them, although it is recommended to use all of them, you can selectively implement the features that best fit your project's requirements and workflow, ensuring a smoother integration process.

## Templates

The Templates for new issues or new Pull Requests are added into the organization so all repos are able to use the templates by default. 

## Telegram integration

* Copy .github/workflows into existing repository for Telegram bot integration
* Create a telegram super group for the repository and create 3 topics for git issues, new PRs, and any git commits
* Add [BaseRepoBot](https://t.me/BaseGitRepo_bot) into the group
* Go to repo variables and create 4 variables (e.g. https://github.com/Organisation/Repo/settings/secrets/actions)
  * `TELEGRAM_TOKEN : Telegram Bot's Id here`
* Go to repo variables and create 4 variables (e.g. https://github.com/Organisation/Repo/settings/variables/actions)
  * `TELEGRAM_CHAT_ID : Super group's Id here`
  * `TELEGRAM_THREAD_ID_ISSUES: thread id for git issues`
  * `TELEGRAM_THREAD_ID_PULL_REQUESTS: thread id for PRs`
  * `TELEGRAM_THREAD_ID_PUSHES: thread id for git commits`

## Pre-commit hooks

* Copy Hooks folder into your root repo directory
* run `npx husky install`
* Copy the contents from `Hooks/commit-msg` into `.husky/_/commit-msg`
