
export function resetForm(setName,setCompany,setEmail, setValidEmail,setValidPass,setIsConfirmPass,setSpanEmail,setSpanPass,setSpanCPass,setPassword,setConfirmPass){
    setName('')
    setCompany('')
    setEmail('')
    setValidEmail(false);
    setValidPass(false);
    setIsConfirmPass(false);
    setSpanEmail('');
    setSpanPass('');
    setSpanCPass('');
    setPassword('');
    setConfirmPass('');
}
