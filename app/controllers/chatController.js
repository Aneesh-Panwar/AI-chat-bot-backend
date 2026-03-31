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
    let isClosed = false;
    const controller = new AbortController();

    if(!message){
      return res.status(400).json({error:"Message is rquired..."});
    }
  
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Transfer-Encoding", "chunked");
    res.setHeader("Connection", "keep-alive");
  
    const cleanup = (reason = "unknown") => {
      if (isClosed) return;
      isClosed = true;

      console.log(`Stream closed: ${reason}`);
      controller.abort();
      try {
        if (!res.writableEnded) {
          res.end();
        }
      } catch (err) {
        console.error("Error while ending response:", err);
      }
    };

    req.on("aborted",()=>{
      cleanup("Client aborted");
    })
    
    res.on("close",()=>{
      cleanup("Response closed")
    })
    
    res.on("error",()=>{
      cleanup("Response error");
    })

    req.on("error",()=>{
      cleanup("Client error");
    })

    await chatCore(
      message,
      {
      stream: true,
      signal:controller.signal,
      onChunk: async(chunk)=>{
        if(isClosed || res.writableEnded) return;
        try {
          let success = res.write(chunk);
    
          if(!success){
            await new Promise(resolve => {
              res.once("drain",resolve);
            });
          }
        } catch (error) {
          cleanup("write error");
        }

      }
    });
  
    cleanup();

  } catch (error) {

    console.log("streaming ERROR :",error.message);
    if(!res.headersSent){
      res.status(500).json({error:"Server error"});
    }else{
      res.end();
    }
  }

}