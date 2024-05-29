import CircuitImage from "../svg/circuit";

export default function ContactSection() {
    return (
        <section className="py-16 bg-base-alt" id="contact">
            <div className="w-full container mx-auto px-10">
                <h2 className="text-2xl font-bold leading-tight text-left">Contact</h2>

                <div className="grid grid-cols-2 gap-4 items-center">
                    <div>
                        <form className="bg-base shadow-md rounded flex flex-col w-full justify-center items-center p-12">
                            <div className="mb-4 w-full">
                                <label className="block text-sm font-bold mb-2" htmlFor="name">
                                    Name
                                </label>
                                <input id="name" name="name" type="text" className="shadow appearance-none border border-muted rounded w-full py-2 px-3 bg-base-alt opacity-90 text-base leading-tight focus:outline-none focus:shadow-outline" />
                                
                            </div>
                            <div className="mb-4 w-full">
                                <label className="block text-sm font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input id="email" name="email" type="email" className="shadow appearance-none border border-muted bg-base-alt rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" />
                                
                            </div>
                            <div className="mb-4 w-full">
                                <label className="block text-sm font-bold mb-2" htmlFor="email">
                                    Message
                                </label>
                                <textarea id="message" name="message" rows={4} cols={4}  className="shadow appearance-none border border-muted bg-base-alt rounded w-full py-2 px-3 resize-none leading-tight focus:outline-none focus:shadow-outline" />
                            </div>
                            <div className="mb-4 w-full">
                                <button type="submit" className="button-primary">
                                    Send
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="flex justify-center items-center">
                        <CircuitImage className="" />
                    </div>
                </div>
            </div>
        </section>
    );
}