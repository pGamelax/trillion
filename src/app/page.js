"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Home() {
  const [outros, setOutros] = useState(false);
  const { register, handleSubmit } = useForm();

  const selectOptions = [
    { value: "Clínica Médica", label: "Clínica Médica" },
    { value: "Clínica Odontolóigica", label: "Clínica Odontolóigica" },
    { value: "Saúde e bem estar", label: "Saúde e bem estar" },
    { value: "E-commerce", label: "E-commerce" },
    { value: "B2B (Atacado)", label: "B2B (Atacado)" },
    { value: "Infoproduto", label: "Infoproduto" },
    { value: "Restaurante", label: "Restaurante" },
    { value: "Loja de roupas", label: "Loja de roupas" },
    {
      value: "Escritório de contabilidade",
      label: "Escritório de contabilidade",
    },
    {
      value: "Outros",
      label: "Outros",
    },
  ];

  const handleNichoValue = (value) => {
    value == "Outros" ? setOutros(true) : setOutros(false);
  };

  const apiURL = process.env.API_BACKEND;

  const onSubmit = (data) => {
    console.log(data);
    data.niche == "Outros"
      ? axios.post(`${apiURL}`, {
          name: data.name,
          phone: data.phone,
          email: data.email,
          niche: data.outros,
          meet: data.meet,
          sendEmail: data.checkbox,
        }).then((resp) => {
          window.location.assign("https://docs.google.com/forms/d/e/1FAIpQLSeVxr8wUN_s69D7W6lu_WE4Wel6_5JvtmYva9QrRFrjDycK8A/viewform")
        })
      : axios.post(`${apiURL}`, {
          name: data.name,
          phone: data.phone,
          email: data.email,
          niche: data.niche,
          meet: data.meet,
          sendEmail: data.checkbox,
        }).then((resp) => {
          window.location.assign('https://docs.google.com/forms/d/e/1FAIpQLSeVxr8wUN_s69D7W6lu_WE4Wel6_5JvtmYva9QrRFrjDycK8A/viewform')
        })
        
  };

  return (
    <main className="">
      <div className="flex items-center justify-center sm:h-screen">
        <div className="bg-[#151717] w-[480px] h-screen pb-4 px-8 overflow-auto">
          <div className="flex flex-col items-center">
            <img className=" w-[480px] " src={"/name-logo.png"} />
            <div className="flex flex-col">
              <h1 className="text-white mt-3 font-bold text-center text-xl">
                AGRADECEMOS O SEU CONTATO!
              </h1>
              <span className="text-yellow-300 text-center mt-3 text-lg">
                Por favor, comece respondendo as perguntas abaixo.
              </span>
              <span className="text-white text-center mt-3 text-lg">
                Quando enviar a mensagem, você será direcionado para responder
                um BRIEFING sobre o seu projeto digital.
              </span>
            </div>
          </div>
          <div className="text-white mt-4">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
              <label>Nome*</label>
              <input
                {...register("name", { required: true })}
                placeholder="Digite seu nome "
                className="px-2 h-8 rounded text-black"
              />
              <label className="mt-4">Telefone*</label>
              <input
              
                {...register("phone")}
                placeholder="ex: 18999999999"
                className="px-2 h-8 rounded
                text-black"
              />
              <label className="mt-4">E-mail*</label>
              <input
                {...register("email", { required: true })}
                placeholder="Digite seu E-mail"
                className="px-2 h-8 rounded text-black"
              />
              <label className="mt-4">Nicho de atuação:*</label>
              <select
                {...register("niche", { required: true })}
                className="rounded h-8 px-2 text-black"
                onChange={(e) => handleNichoValue(e.target.value)}
              >
                {selectOptions.map((item, index) => {
                  return (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
              </select>
              <input
                {...register("outros", { required: outros ? true : false })}
                className={` ${
                  outros ? "" : "hidden"
                } mt-4 rounded px-2 h-8 text-black`}
                placeholder="Digite aqui seu nicho"
              />
              <label className="mt-4">Como conheceu a Trillion?*</label>
              <select
                {...register("meet", { required: true })}
                className="rounded h-8 px-2 text-black"
              >
                <option value="Indicacao">Indicação</option>
                <option value="Redes Sociais">Redes Sociais</option>
              </select>
              <div className="mt-2 flex gap-2 ">
                <input type="checkbox" {...register("checkbox")} />
                <label>Eu concordo em receber e-mails da Trillion</label>
              </div>
              <div className="mt-4 text-white flex flex-col items-center">
                <p>
                  A Trillion está comprometida a proteger e respeitar sua
                  privacidade, utilizaremos seus dados apenas para fins de
                  marketing. Você pode alterar suas preferências a qualquer
                  momento.
                </p>
                <input
                  type="submit"
                  value="Enviar mensagem"
                  className="bg-yellow-400 font-bold h-16 w-[90%] text-xl rounded mt-6 hover:bg-yellow-300 "
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
