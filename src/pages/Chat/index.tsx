import './styles.css'
import { useTranslation } from "react-i18next";

function Chat() {

  const { t } = useTranslation();

  return (
    <section id="chat">
        <h2>Chat</h2>
    </section>
  )
}

export default Chat
