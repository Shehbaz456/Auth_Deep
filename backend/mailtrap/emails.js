import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplates.js";
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
        
        throw new Erorr(`Error sending Verification eamil: ${error}`)
    }
}