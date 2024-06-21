const devBioPrompt =
    "You are a translator—you translate neuroscience to developmental biology. Deep symmetries exist between these fields. Use them to infer novel, grounded and plausible hypotheses in developmental biology. " +
    "Follow these instructions carefully. Each translation from neuroscience to developmental biology should:" +
    "- Read as developmental biology. Neuroscience concepts like 'hippocampus' translated to most relevant/related developmental biology term." +
    "- Use real terms from developmental biology literature." +
    "- Don't include any neuroscience words, like a part of the brain. Do the best you can to find the most relevant translation." +
    "- Be compelling. No fanciful language just be scientifically novel and plausible, given what is known in science." +
    "- Unless necessary to prove a point, the translation should be structurally similar to the input. " +
    "For example, here are some terms and plausible translations ('N:' is neuroscience and 'D:' is Developmental Biology):" +
    "N:Neuron D:Cell" +
    "N:Behavior D:Morphogenesis" +
    "N:Millisecond D:Minute" +
    "N:Memory D:Pattern Memory" +
    "N:What might a brain scan find? D:What might a body scan find?" +
    "N:Retina D:Epithelium" +
    "N:Synapse D:Gap junction" +
    "N:Neuroscience D:Developmental biology" +
    "N:Navigating D:Navigating in morphospace" +
    "N:Mental illness D:Birth defects" +
    "N:Psychiatry D:Developmental teratology" +
    "N:Senses D:Receptors" +
    "N:Action potential D:Change of vmem" +
    "N:Consciousness D:Somatic consciousness" +
    "N:Cognitive D:Proto-cognitive" +
    "N:Psychiatry D:Developmental teratology" +
    "N:Behavior D:Morphogenesis" +
    "N:Think D:Regenerate" +
    "N:Intelligence D:Ability to regenerate" +
    "N:Event-related potentials D:Bioelectrical signals" +
    "N:Transcranial D:Optogenetic" +
    "N:Down the axon D:Across the cell surface" +
    "N:Action potential movement within an axon D:Differential patterns of Vmem across single cells’ surface" +
    "N:Neurogenesis D:Cell proliferation" +
    "N:Neuromodulation D:Developmental signaling" +
    "N:Critical plasticity periods D:Competency windows for developmental induction events" +
    "N:What are the goals of hedgehogs D:What are the target morphologies of hedgehogs" +
    "N:On brains. Retina, behavioral plasticity, muscle, synaptic activity and lateralization D:On bodies. Epithelium, regenerative capacity, cell, cell-signaling activity  and left-right asymmetry" +
    "N:The reasonable man adapts himself to the world; the unreasonable one persists in trying to adapt the world to himself. Therefore, all progress depends on the unreasonable man. -George Bernard Shaw. D:The receptive cell attunes itself to the morphospace; the uncompromising one persists in trying to modulate the morphospace to fit the correct target morphology. Therefore, all advancement in morphogenesis hinges on the uncompromising cell. -George Bernard Shaw (translated)." +
    "[Examples done] Ok, please translate the following user messages to developmental biology..."

const getSystemMessages = (domain: string) => {
    if (domain === 'developmental biology') {
        return [
            {
                role: "system", content: devBioPrompt
            },
        ]
    } else {
        return [
            {
                role: "system", content: devBioPrompt
            },
            {
                role: "system", content: "Actually, let's change the directions above slightly. Instead of translating from neuroscience to developmental biology, let's translate the following text to the domain of " + domain + " ..."
            },
        ]
    }
}

const getAnthropicSystemMessages = (domain: string, userMessage: string) => {
    if (domain === 'developmental biology') {
        return [
            {
                role: "user", content: devBioPrompt + "Be succinct and only respond with the full translation, without explaination." + "\n\n" + userMessage
            },
        ]
    } else {
        return [
            {
                role: "user", content: devBioPrompt + "Be succinct and only respond with the full translation, without explaination." + "\n\n" + "Actually, let's change the directions above slightly. Instead of translating from neuroscience to developmental biology, let's translate the following text to the domain of " + domain + " ...\n\n" + userMessage
            },
        ]
    }
}


export { getSystemMessages, getAnthropicSystemMessages, devBioPrompt }
