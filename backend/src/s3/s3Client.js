// s3Client.js
import { S3Client, PutObjectCommand, CopyObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import dotenv from 'dotenv';

dotenv.config();



const s3 = new S3Client({
    region: 'us-east-2',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    logger: console, // Add this to see SDK logs
    maxAttempts: 3,
    retryMode: 'standard'
  });

  console.log('ALL AWS_* env vars:', 
    Object.entries(process.env)
      .filter(([k]) => k.startsWith('AWS_'))
  );
  

  // after your dotenv.config()
const creds = await s3.config.credentials();  
console.log("Resolved AWS credentials:", {
  accessKeyId: creds.accessKeyId,
  // don’t log secretAccessKey in real life—this is just for debugging!
  hasSessionToken: !!creds.sessionToken  ,
});

console.log(' env variables loaded: ', {  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY})

// s3Client.js
export async function generateUploadUrl(filename, contentType) {
    try {
      console.log('Generating URL for:', { filename, contentType });
      
      const command = new PutObjectCommand({
        Bucket: 'pets-day-out-photos',
        Key: filename,
        ContentType: contentType,
        ACL: 'public-read'
      });
  
      console.log('Command created, getting signed URL...');
      
      const url = await getSignedUrl(s3, command, { 
        expiresIn: 3600,
        signingRegion: 'us-east-2' // Explicitly set signing region
      });
      
      console.log('Successfully generated URL:', url);
      return url;
      
    } catch (error) {
      console.error('Error in generateUploadUrl:', {
        message: error.message,
        stack: error.stack,
        name: error.name,
        code: error.code,
        time: new Date().toISOString()
      });
      throw error;
    }
  }

  export async function copyMoveAndDeleteTempImage(customerID, petID,tempImageID) {
    await s3.send(new CopyObjectCommand({
      Bucket: 'pets-day-out-photos',
      CopySource: `pets-day-out-photos/temp-uploads/${customerID}/${tempImageID}.jpg`,
      Key: `${petID}/profile.jpg`
    }))
    console.log('temporary bucket image copied')
    await s3.send(new DeleteObjectCommand({
      Bucket: 'pets-day-out-photos',
      Key: `temp-uploads/${customerID}/${tempImageID}`
    }))
    console.log('temporary bucket image deleted')
  }