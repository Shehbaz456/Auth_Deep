// import { Error } from "mongoose";
import { PASSWORD_RESET_REQUEST_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
import { mailtrpClient,sender } from "./mailtrap.config.js"

export const sendVerificationEmail = async (email,verificationToken) =>{
    const recipient = [{email}];
    try {
        const response = await mailtrpClient.send({
            from : sender,
            to:recipient,
            subject:"Verify your email",
            html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
            category:"Email Verification"
        })

        console.log("Email send Successfully : ",response);
        
    } catch (error) {
        console.log(`Error sending Verification eamil: ${error}`);
        
        throw new Error(`Error sending Verification eamil: ${error}`)
    }
}

export const sendWelcomeEmail = async (email,name)=>{
    const recipient = [{email}];
    try {
        
        const response = await mailtrpClient.send({
            from:sender,
            to:recipient,
            template_uuid:"3704350d-ebc2-40b9-a8c9-b0e49e459fe2",
            template_variables:{
                name: name,    
            }
        })
        console.log("welcome email send successfully",response)

    } catch (error) {
        console.error("Error sending welcome email",error);
        throw new Error(`Error sending welcome eamil: ${error}`)
    }
}                                                            

export const sendPasswordResetEmail = async (email,ResetURL) =>{
    const recipient = [{email}];
    try {
        const response = await mailtrpClient.send({
            from : sender,
            to:recipient,
            subject:"Reset your password",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",ResetURL),
            category:"Password Reset"
        })  
    } catch (error) {
        console.error(`Error sending passowrd reset email`,error);
        throw new Error(`Error sending password reset email: ${error} `);
    }
}