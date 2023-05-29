import Image from 'next/image';
import { useState } from 'react';
import axios from 'axios';

export default function Menu({ setSelectedComponent, question, questions, progress, setProgress, setQuestions }: any) {

    let wallets = [
        "EHyagVK6vWdhyp8Mn3NGLeC33LtQyPdDs1idNiBddTjF",
        "FpscJFipKBoAFXjhXfrruWyhsoNFisu8H8kLDdw1k8yH",
        "H7y6nvRCqe96ip1iYT5Hnjd7HMzRrN1nM8Z3d2Ad5LEk",
        "CAyxRpZ5dJzww7AjTf2pM8R6UNDfSLuHkouoHTyeu9rC",
        "D77Jk7KfBKWrtMfaZDLJTLhd1dFac2YAM6CoiwzSYnp7",
        "AmoRXq81SmTSn1M2ZMSo6zuzCjrYAkCVimZWqXAgaLDt",
        "GkEVXEapXkxc7pScePBP37BJaRBycyEPBYaS7uYJuq8m",
        "6qwiJTLDPS222HsdsN423f1VAPxyJGc8LHKZSBzQKK5U",
        "T1d3crwf5cYLcVU5ojNRgJbJUXJta2uBgbtev2xWLAW",
    ]

    let tokens = [
        "5B72RArx2mQvudmS9CBZzDFhNC7FTFtp2k2GEhQV6HqZ",
        "9ARngHhVaCtH5JFieRdSS5Y8cdZk2TMF4tfGSWFB9iSK",
        "F9Lw3ki3hJ7PF9HQXsBzoY8GyE6sPoEZZdXJBsTTD2rk",
        "BDR44BrnjaeuvNhYkznu5YW5DzLda7BSGsWJ6jvDRaYS",
    ]

    let transactions = [
        "4gWppNT3N7J4se2E6FAhG9BK7FUP5y5etDyBPPEJ7hz1M2UgAD2pfMieNAVbwr2NuZF8fNtUEEkNPki8Dea7NFoW",
        "5hdwrwgfbFDbxsigaqHEB8syYrWjaidRec96xdbP7V4BPSMuYBk8yFeq8jdWxDPgK7CYLwEV2bAgSuPbf55HGzvg",
        "5HLQwnpm2jLP4FJwin7Ae59ayXgJ9U41H5JushgkY1kQEe5q9Hnk5ksNPt6f7YpayhWp4xTqya2WKjYaUghbnhTV",
        "5xHyU7YfXQRvpn6LxEgVKmT8XuquLzp99T2ewxaiNjfLwz6iuWKVfUv3ZArNDKytY7dakKwThtpWygwJcvr5wveU",
        "5rx5m8MFM1rvWfjH2vNe7vix1d1Pyb4TKUApM5M9Fmr3XEeWqFizNZk4XVhB8Xa5VyfirfpfrEbMdXxvzVLS3amh"
    ]

    const [context, setContext] = useState(question.type == "wallet" ? (wallets[Math.floor(Math.random() * wallets.length)]) :
        question.type == "nft" ? (tokens[Math.floor(Math.random() * tokens.length)]) :
            transactions[Math.floor(Math.random() * transactions.length)])
    const [answer, setAnswer] =
        useState('')
    const [solved, setSolved] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [load, setLoad] = useState(false)

    async function handleSubmit(event: any) {
        event.preventDefault();
        setLoad(true)
        const response = await axios.post(`/api/${question.api}`, { address: context });
        setSubmit(true)
        try {
            if (response.data == answer) {

                setSolved(true);
                setProgress(progress += question.difficulty);

                let newArr: any = questions
                const index = questions.findIndex((e: any) => e.name === question.name);
                if (index !== -1) {
                    newArr.splice(index, 1);
                }
                setQuestions(newArr)

                setTimeout(() => {
                    setSelectedComponent('Menu')
                }, 500)

            }
            else if (response.data != answer) {
                setLoad(false)
            }
        }
        catch (err: any) {
            console.log(err.response.data)
        }
    }


    return (
        <div className='flex items-center justify-center h-full w-full flex-col bg-zinc-950 animate-fade'>


            <div className='absolute w-full top-0 sticky px-2 xl:px-8 py-4 bg-zinc-950'>
                <div className='flex flex-row items-center space-x-2 xl:space-x-8'>
                    <button
                        className="flex opacity-70 hover:opacity-100 duration-200 font-bold justify-center rounded-full overflow-show"
                        onClick={() => setSelectedComponent('Menu')}
                    >
                        <div className='flex items-center justify-center w-6 h-4'>
                            <Image className='' alt="back" src="/back.svg" width={16} height={16}></Image>
                        </div>
                    </button>

                    <div className="flex relative w-full h-4 bg-zinc-800 rounded-lg z-0">
                        <div style={{ width: `${progress * 10}%` }}
                            className={`flex duration-200 relative h-4 items-center rounded-lg bg-orange-500 max-w-full justify-center`}>
                        </div></div>
                </div>
            </div>

            <div className='flex h-full p-4 flex-col justify-center items-center justify-between xl:justify-evenly overflow-hidden'>



                <div className='flex justify-center flex-col items-center space-y-8'>
                    <div className='flex text-xl text-white font-bold'>{question.name}</div>
                    <div className='flex items-center text-zinc-400 bg-zinc-900 p-3 rounded-md'>{question.description}</div>

                    <div onClick={() => { navigator.clipboard.writeText(context) }} className='flex duration-200 cursor-pointer hover:bg-zinc-800 rounded-full bg-zinc-900 px-4 py-2 justify-center'>
                        {context.slice(0, 4) + '..' + context.slice(-4)}</div>
                </div>



                <form onSubmit={handleSubmit} className={`flex duration-200 ${(solved) ? (`border-2 border-green-500`) : (submit == false ? ('') : ('border-2 border-red-500 animate-shake'))} rounded-lg w-full items-center justify-center`}>
                    <input
                        type="text"
                        value={answer}
                        className="flex px-4 py-2 rounded-l-lg w-full outline-0 bg-zinc-800 text-white"
                        onChange={(e: any) => setAnswer(e.target.value)}
                    />
                    <button className='flex items-center justify-center h-10 p-2 rounded-r-lg bg-zinc-800 font-bold text-white duration-200 cursor-pointer' type="submit">

                        <div className='flex justify-center items-center'>{(
                            load ? (
                                <svg className="flex animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) :
                                (
                                    <Image className='opacity-70 hover:opacity-100 duration-200' alt="back" src="/check.svg" width={24} height={24}></Image>
                                ))}
                        </div>
                    </button>
                </form>

            </div>



        </div>
    )
}