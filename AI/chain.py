from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate
from langchain_openai import ChatOpenAI
from dotenv import load_dotenv
import os

load_dotenv()
api_key = os.getenv("OPENAI_API_KEY")
MODEL_NAME = "gpt-4.1-nano"

def llms(MODEL_NAME):
    llm = ChatOpenAI(
        model_name=MODEL_NAME,
        temperature=0.05,
        max_tokens=1000,
        api_key=api_key
    )
    return llm

def prompt_template(template):
    prompt = PromptTemplate(
        input_variables=["input"],
        template=template
    )
    return prompt

def llm_chain(prompt, llm):
    chain = LLMChain(
        llm=llm,
        prompt=prompt
    )
    return chain

template = """Bạn là 1 trợ lý ảo AI chuyên tư vấn về vấn đề ăn uống ẩm thực hay trả lời những câu hỏi của người dùng.
    {input}
    """

prompt = prompt_template(template)
llm = llms(MODEL_NAME)
chain = llm_chain(prompt, llm)

question = input()
response = chain.invoke({"input": question})
print(response['text'])