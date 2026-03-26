import { chatCore } from "../services/chatCore.js";

export async function fullResponseChatHandler(req, res) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        error: "Message is required"
      });
    }

    const reply = await chatCore(message);

    res.json({
      reply
    });

  } catch (error) {
    console.error("Chat error:", error);

    res.status(500).json({
      error: "Internal server error"
    });
  }
}

export async function streamResponseChathandler(req,res) {
 try {

  const {message} = req.body;
 
  if(!message){
     return res.status(400).json({error:"Message is rquired"});
  }
 
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Transfer-Encoding", "chunked");
  res.setHeader("Connection", "keep-alive");
 
  await chatCore(message,{
    stream: true,
    onChunk: (chunk)=>{
      res.write(chunk);
    }
  });
 
  res.end();
 } catch (error) {
  console.log("streaming ERROR :",error);
  
  if(!res.setHeader){
    res.status(500).json({error:"Server error"});
  }else{
    res.end();
  }
 } 

}