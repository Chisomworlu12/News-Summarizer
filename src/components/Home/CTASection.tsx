import { useNavigate } from "react-router-dom";
import Button from "../ui/Button.js";

const CTASection = () => {
    const navigate = useNavigate();
    const handleGetStarted = () => {
       navigate("/newsfeed");
    };

    return(
        <div className=" py-8 text-white">
            <div className=" text-center mx-6 flex flex-col items-center justify-center rounded-2xl h-[346px] bg-dark-radial dark:bg-light-radial shadow-lg shadow-cta-dark-blue/30"> 
                <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
                <p className="text-lg mb-6">Join thousands of professionals who save 5+ hours every week by summarizing their news feed with AI.</p>
                <Button onClick={handleGetStarted} className="b transition duration-500 hover:scale-110 ">
                    Get Started
                </Button>
            </div>
        </div>
    )
}

export default CTASection;