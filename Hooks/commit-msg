#!/bin/bash

# Get the commit message from the first argument
commit_msg_file=$1
commit_msg=$(cat "$commit_msg_file")

pattern="^(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test)(\(.+\))?: .+"

# Check if the commit message matches the pattern
if [[ ! $commit_msg =~ $pattern ]]; then
    echo "Error: Commit message does not follow conventional commit format."
    echo "Please use a message in the format: <type>(<scope>): <description>"
	echo "type: build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test"
    exit 1
fi

# If the commit message matches the pattern, exit successfully
exit 0