# `direnvp` - direnv profile switcher
`direnvp` helps you to easily switch different profiles of .envrc

## Use case
Create different profiles of the same environment variables and easily switch between them, these profiles are typically segregated based on your application environment/stages. Ex: dev,stg,prod 

## How it works
You create three different `.envrc` files ie `.envrc.dev`, `.envrc.stg` and `.envrc.prod` for `dev`, `stg` and `prod` profiles respectively. Switching between the profiles happens via **deleting** the existing `.envrc` file and creating a symlink to the required profile.


## Getting Started

### Prerequisites

* [Installing direnv](https://direnv.net/docs/installation.html)
* [direnv hook setup](https://direnv.net/docs/hook.html)
* [nodejs](https://nodejs.org/en/download/)

### Basic Installation

* `npm install -g direnvp`

### Quick demo & Help


```shell
# Create a new folder for demo purposes.
$ mkdir ~/my-project
$ cd ~/my-project

# Show that the FOO environment variable is not loaded.
$ echo ${FOO-nope}
nope

# Create three different .envrc files that different values for the same FOO variable
$ echo export FOO=development > .envrc.dev
$ echo export FOO=staging > .envrc.stg
$ echo export FOO=production > .envrc.prod

# By default when you run direnvp it lists all the profiles available
$ direnvp
dev
prod
stg

# Switch to dev profile
$ direnvp dev
switched to dev profile
direnv: error ~/my-project/.envrc is blocked. Run `direnv allow` to approve its content
$ direnv allow 
direnv: loading ~/my-project/.envrc
direnv: export +FOO

# Now FOO is set to development
$ echo ${FOO-nope}
development

# Switch to stg profile
$ direnvp stg
switched to stg profile
direnv: error ~/my-project/.envrc is blocked. Run `direnv allow` to approve its content
$ direnv allow
direnv: loading ~/my-project/.envrc
direnv: export +FOO

# Now FOO is set to staging
$ echo ${FOO-nope}
staging

# direnv allow is not required always as long as the files don't change
$ direnvp dev
switched to dev profile
direnv: loading ~/my-project/.envrc
direnv: export +FOO

# Now FOO is set back to development
$ echo ${FOO-nope}
development

# Showing the symlink
$ ls -al
total 24
drwxr-xr-x   6 dhanvi  staff   192 Dec 16 16:30 .
drwxr-xr-x+ 38 dhanvi  staff  1216 Dec 16 16:32 ..
lrwxr-xr-x   1 dhanvi  staff    10 Dec 16 16:30 .envrc -> .envrc.dev
-rw-r--r--   1 dhanvi  staff    23 Dec 16 16:19 .envrc.dev
-rw-r--r--   1 dhanvi  staff    22 Dec 16 16:21 .envrc.prod
-rw-r--r--   1 dhanvi  staff    19 Dec 16 16:20 .envrc.stg

# Show help
$ direnvp -h
Usage:
direnvp                     : list the profiles
direnvp <NAME>              : switch to profile <NAME>

direnvp -v, --version       : output the version number
direnvp -h,--help           : show this message

# Show version
$ direnvp -v
1.0.0

# direnvp creates a empty new profile/file for you if it doesn't exist
$ direnv dev2
dev2 profile not found, created a empty file .envrc.dev2
switched to dev2 profile
direnv: error ~/my-project/.envrc is blocked. Run `direnv allow` to approve its content

```
