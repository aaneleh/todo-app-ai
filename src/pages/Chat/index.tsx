import './styles.css'
import { useTranslation } from "react-i18next";

function Chat() {

  const { t } = useTranslation();

  return (
    <section id="chat">
        <h2>Chat</h2>
        <div className="chat-content">
          <p className="chat ai-chat">
            Hello World
          </p>
                  <p className="chat ai-chat">
            Eaerr
          </p>
        </div>
        <div className="chat-input">
          NOVA MENSAGEM
        </div>
    </section>
  )
}

export default Chat
