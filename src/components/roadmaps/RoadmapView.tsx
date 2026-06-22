"use client"

import React, { useState, useEffect } from 'react'
import { CheckCircle2, Circle, Lock, BookOpen, ArrowRight, ArrowLeft, Sparkles, Send, X, Trophy } from 'lucide-react'
import { Roadmap, RoadmapNode } from '@/data/roadmaps'
import { useProgress } from '@/context/ProgressContext'
import { Button } from '@/components/ui/Button'
import { motion, AnimatePresence } from 'framer-motion'
import { QuizView } from './QuizView'
import { FinalExamView } from './FinalExamView'

interface RoadmapViewProps {
  roadmap: Roadmap
}

export function RoadmapView({ roadmap }: RoadmapViewProps) {
  const { completedNodes, toggleNode } = useProgress()
  const [activeNodeId, setActiveNodeId] = useState<string | null>(null)
  const [activeQuizNode, setActiveQuizNode] = useState<RoadmapNode | null>(null)
  const [activeExam, setActiveExam] = useState(false)
  const [isAiOpen, setIsAiOpen] = useState(false)
  const [aiMessages, setAiMessages] = useState<{role: string, content: string}[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isAiLoading, setIsAiLoading] = useState(false)

  const nodes = [...roadmap.nodes].sort((a, b) => a.order - b.order)
  
  useEffect(() => {
    if (nodes.length > 0) {
      const firstUncompleted = nodes.find(n => !completedNodes.has(n.id))
      setActiveNodeId(firstUncompleted?.id || nodes[nodes.length - 1].id)
    }
  }, [completedNodes, nodes])

  const isNodeLocked = (node: RoadmapNode, index: number) => {
    if (index === 0) return false
    const prevNode = nodes[index - 1]
    return !completedNodes.has(prevNode.id)
  }

  return (
    <>
    <div className="flex flex-col lg:flex-row gap-8 h-full">
      {/* Visual Roadmap Column */}
      <div className="flex-1 relative p-6 bg-card rounded-3xl border border-border overflow-y-auto max-h-[80vh] lg:max-h-screen">
        <div className="relative flex flex-col items-center gap-12">
          {nodes.map((node, index) => (
            <React.Fragment key={node.id}>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => !isNodeLocked(node, index) && setActiveNodeId(node.id)}
                className={`relative z-10 w-full max-w-sm p-4 rounded-2xl border-2 transition-all cursor-pointer group
                  ${activeNodeId === node.id ? 'border-primary bg-primary/5 shadow-lg shadow-primary/10' : 
                    isNodeLocked(node, index) ? 'border-muted bg-muted/30 opacity-60' : 'border-border bg-background hover:border-primary/50'}
                `}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    completedNodes.has(node.id) ? 'bg-primary text-white' : 
                    isNodeLocked(node, index) ? 'bg-muted text-muted-foreground' : 'bg-secondary text-foreground'
                  }`}>
                    {completedNodes.has(node.id) ? <CheckCircle2 className="w-6 h-6" /> : 
                     isNodeLocked(node, index) ? <Lock className="w-5 h-5" /> : <Circle className="w-5 h-5" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-sm">{node.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-1">{node.description}</p>
                  </div>
                  {activeNodeId === node.id && (
                    <div className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase">
                      Active
                    </div>
                  )}
                </div>
              </motion.div>
              
              {index < nodes.length - 1 && (
                <div className="w-1 h-12 bg-border relative">
                  <div 
                    className="absolute top-0 left-0 w-full bg-primary transition-all duration-500" 
                    style={{ height: completedNodes.has(nodes[index].id) ? '100%' : '0%' }}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Content Panel */}
      <div className="lg:w-[450px] p-8 bg-background rounded-3xl border border-border sticky top-24 h-fit">
        <AnimatePresence mode="wait">
          {activeNodeId ? (
            <motion.div 
              key={activeNodeId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Learning Module</span>
              </div>
              
              <h2 className="text-2xl font-bold">
                {nodes.find(n => n.id === activeNodeId)?.title}
              </h2>
              
              <div className="p-4 rounded-2xl bg-secondary text-muted-foreground text-sm leading-relaxed">
                {nodes.find(n => n.id === activeNodeId)?.content}
              </div>

                {completedNodes.size >= nodes.length ? (
                  <Button 
                    variant="primary" 
                    onClick={() => setActiveExam(true)}
                    className="gap-2"
                  >
                    Claim Certification <Trophy className="w-4 h-4" />
                  </Button>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Button 
                      variant="primary" 
                      className="gap-2 w-full"
                      onClick={() => {
                        const node = nodes.find(n => n.id === activeNodeId);
                        if (node) {
                          // We need technology for the route. If node doesn't have it, we can try to infer it from the roadmap category or a default\n                          window.location.href = `/learn/${roadmap.category.toLowerCase()}/${node.slug}`;
                        }
                      }}
                    >
                      Start Learning <ArrowRight className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      className="gap-2 w-full"
                      onClick={() => {
                        const node = nodes.find(n => n.id === activeNodeId);
                        if (node && node.quiz && !completedNodes.has(node.id)) {
                          setActiveQuizNode(node);
                        } else {
                          toggleNode(activeNodeId);
                        }
                      }}
                    >
                      {completedNodes.has(activeNodeId) ? (
                        <>Undo <CheckCircle2 className="w-4 h-4" /></>
                      ) : (
                        <>Quick Mark Complete <CheckCircle2 className="w-4 h-4" /></>
                      )}
                    </Button>
                  </div>
                )}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Select a node to start learning</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
    <AnimatePresence>
      {activeQuizNode && (
        <QuizView 
          question={activeQuizNode.quiz!.question}
          options={activeQuizNode.quiz!.options}
          correctOption={activeQuizNode.quiz!.correctOption}
          onSuccess={() => {
            toggleNode(activeQuizNode.id);
            setActiveQuizNode(null);
          }}
          onClose={() => setActiveQuizNode(null)}
        />
      )}
    </AnimatePresence>
    
    <AnimatePresence>
      {activeExam && roadmap.finalExam && (
        <FinalExamView 
          exam={roadmap.finalExam}
          onSuccess={async (score) => {
            try {
              await fetch('/api/certifications', {
                method: 'POST',
                body: JSON.stringify({ roadmapId: roadmap.id, score })
              });
              alert("Congratulations! Your certification has been issued.");
            } catch (e) {
              alert("Error issuing certification. Please try again.");
            }
            setActiveExam(false);
          }}
          onClose={() => setActiveExam(false)}
        />
      )}
    </AnimatePresence>
    
    {/* AI Mentor Chat Panel */}
    <AnimatePresence>
      {isAiOpen && (
        <motion.div 
          initial={{ opacity: 0, x: 400 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 400 }}
          className="fixed right-0 top-0 h-screen w-full max-w-md bg-background border-l border-border shadow-2xl z-50 flex flex-col"
        >
          <div className="p-6 border-b border-border flex items-center justify-between bg-card">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-foreground">Forge AI Mentor</h3>
                <p className="text-[10px] text-muted-foreground uppercase tracking-tighter">Contextual Learning Assistant</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsAiOpen(false)}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {aiMessages.length === 0 && (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold">Hello, Learner!</h4>
                  <p className="text-sm text-muted-foreground">
                    I'm analyzing your current node: <br/>
                    <span className="text-foreground font-medium italic">"{nodes.find(n => n.id === activeNodeId)?.title}"</span>
                  </p>
                </div>
              </div>
            )}
            {aiMessages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-primary text-primary-foreground rounded-tr-none' 
                    : 'bg-secondary text-foreground rounded-tl-none border border-border'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isAiLoading && (
              <div className="flex justify-start">
                <div className="bg-secondary p-3 rounded-2xl rounded-tl-none border border-border">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce" />
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-border bg-card">
            <form 
              className="flex gap-2" 
              onSubmit={async (e) => {
                e.preventDefault();
                if (!inputMessage.trim() || isAiLoading) return;
                
                const userMsg = inputMessage;
                setInputMessage('');
                setAiMessages(prev => [...prev, { role: 'user', content: userMsg }]);
                setIsAiLoading(true);

                try {
                  const res = await fetch('/api/ai/mentor', {
                    method: 'POST',
                    body: JSON.stringify({ 
                      message: userMsg, 
                      nodeId: activeNodeId,
                      context: nodes.find(n => n.id === activeNodeId)?.title 
                    })
                  });
                  const data = await res.json();
                  setAiMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
                } catch (err) {
                  setAiMessages(prev => [...prev, { role: 'assistant', content: "Sorry, my circuits are humming too loud. Please try again!" }]);
                } finally {
                  setIsAiLoading(false);
                }
              }}
            >
              <input 
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask about this module..."
                className="flex-1 bg-background border border-border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button type="submit" size="sm" className="p-2">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  )
}
