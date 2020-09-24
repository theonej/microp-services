const aws = require('aws-sdk');
const uuid = require('uuid/v4');
const util = require('util');

const TABLE_NAME = 'profiles';
const REGION = 'us-east-1';

exports.setProfile = async(profile)=>{
    console.info('mock setting profile');
   return true
};

exports.getProfile = async(profileId)=>{
    console.info('mock get profile');

    return {
        profileId
    }
};