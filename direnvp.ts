#!/usr/bin/env node

import * as fs from "fs";
import { Command } from "commander";
import * as chalk from 'chalk';
import { version } from './package.json';
const program = new Command();

program
    .version(version, '-v, --version', 'output the current version')
    .option('-h', '--help', 'show help')
    .argument('[profile]', 'profile')
    .description('direnv profile switcher')
    .helpOption(false)

program.parse();


const args = program.args;
const options = program.opts();

// profile is first argument
const profile = args[0];
const profilePath = `.envrc.${profile}`;

if(options.h) {
    console.log(
`Usage:
direnvp                     : list the profiles
direnvp <NAME>              : switch to profile <NAME>

direnvp -v, --version       : output the version number
direnvp -h,--help           : show this message
`);
    process.exit()
}

function getCurrentProfile () {
    try {
        const stats = fs.lstatSync('./.envrc');
        if(stats.isSymbolicLink()){
            return fs.realpathSync('./.envrc').split('.').at(-1)
        }else{
            return null;
        }
    } catch (err) {
        return null;
    }
}

if(args.length === 0) {
    const files = fs.readdirSync('.').filter(fn => fn.startsWith('.envrc.'));
    const contexts = files.map(fn => fn.split('.').at(-1))

    const currentProfile = getCurrentProfile();
    contexts.forEach(x => {
        if (x == currentProfile){
            console.log(chalk.inverse(currentProfile))
        }else{
            console.log(x)
        }
    })

    if(contexts.length === 0) {
        console.log("No profiles found. Create a file in the current folder with the name '.envrc.dev' for 'dev' profile")
    }
}
else {

    // try deleting the .envrc file
    try {
        fs.unlinkSync('.envrc')
    }
    catch (err) {}

    // creating a empty .envrc.{PROFILE} file if it doesn't exists
    try{
        if(!fs.existsSync(profilePath)){
            fs.closeSync(fs.openSync(profilePath, 'w'))
            console.log(`${profile} profile not found, created a empty file ${profilePath}`)
        }
    }
    catch (err) {}

    // creating a symbolic link between .envrc and .envrc.{PROFILE}
    try {
        fs.symlinkSync(profilePath,'.envrc')
    } catch (err){
        console.log(err)
    }
    console.log(`switched to ${profile} profile`)
}
