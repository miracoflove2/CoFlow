import { Button } from '@/components/ui/button';

const modules = [
  ['Projects', '组织项目与成员权限'], ['Artifacts', '保存来源与不可变版本'],
  ['Contracts', '确认交互、状态、异常和验收标准'], ['Workflow', '追踪任务、审查与人工决策'],
];
export default function Home() {
  return <main className="mx-auto max-w-6xl px-6 py-12">
    <header className="mb-12 flex items-center justify-between"><strong className="text-xl tracking-tight">CoFlow</strong><span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs text-slate-500">Foundation · v0.1</span></header>
    <section className="rounded-2xl bg-slate-900 px-8 py-12 text-white shadow-lg"><p className="mb-3 text-sm uppercase tracking-widest text-cyan-300">Human-governed engineering</p><h1 className="max-w-2xl text-4xl font-semibold leading-tight">让设计、实现与决策形成可追溯的交付链</h1><p className="mt-5 max-w-2xl leading-7 text-slate-300">从来源产物到工程契约、执行任务和人工审核，CoFlow 为每一步保留版本、证据与责任边界。</p><div className="mt-8"><Button disabled className="bg-white text-slate-900">工作台即将开放</Button></div></section>
    <section className="mt-10 grid gap-4 md:grid-cols-2">{modules.map(([name, description]) => <article key={name} className="rounded-xl border border-slate-200 bg-white p-6"><h2 className="text-lg font-semibold">{name}</h2><p className="mt-2 text-sm text-slate-600">{description}</p></article>)}</section>
    <p className="mt-8 text-sm text-slate-500">当前为工程基础版本。项目 API、认证和基础设施已建立；集成与业务工作流将分阶段上线。</p>
  </main>;
}
