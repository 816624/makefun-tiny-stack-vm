import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';
import{join}from'node:path';
const T="!2b%'+,0        *******&***&*** ***             AEEA!           &)              %%\"%";
function run(p:Uint8Array,q:Uint8Array){
 const D=new Int32Array(256);let s=0;const C=new Int32Array(64);let d=0;const M=new Int32Array(256);
 const o=new Uint8Array(65536);let l=0,i=0,pc=0,n=0;const e=new TextEncoder();
 const f=(c:number)=>({out:o.slice(0,l),code:c});
 for(;;){
  if(n===1e6)return f(10);
  if(pc<0||pc>=p.length)return f(9);
  const op=p[pc],c=T.charCodeAt(op)-33;
  if(!(c>=0))return f(5);
  const im=(c/16)|0,pp=((c%16)/4)|0,ps=c%4;
  if(pc+im>=p.length)return f(9);
  n++;const x=pc+1+im;
  if(s<pp)return f(2);
  if(s-pp+ps>256)return f(3);
  pc=x;
  switch(op){
   case 0:return f(0);
   case 1:D[s++]=(p[x-1]<<24)>>24;break;
   case 2:D[s++]=p[x-4]|p[x-3]<<8|p[x-2]<<16|p[x-1]<<24;break;
   case 3:s--;break;
   case 4:D[s]=D[s-1];s++;break;
   case 5:{const v=D[s-1];D[s-1]=D[s-2];D[s-2]=v;break;}
   case 6:D[s]=D[s-2];s++;break;
   case 7:{const a=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=a;break;}
   case 23:D[s-1]=-D[s-1]|0;break;
   case 27:D[s-1]=~D[s-1];break;
   case 48:case 49:case 50:{
    const r=((p[x-2]|p[x-1]<<8)<<16)>>16;let t=true;
    if(op!==48){const v=D[--s];t=op===49?v===0:v!==0;}
    if(t)pc=x+r;break;}
   case 51:
    if(d===64)return f(7);
    C[d++]=x;pc=p[x-2]|p[x-1]<<8;break;
   case 52:
    if(d===0)return f(8);
    pc=C[--d];break;
   case 64:{const a=D[s-1];if(a<0||a>=256)return f(6);D[s-1]=M[a];break;}
   case 65:{const a=D[s-1],v=D[s-2];if(a<0||a>=256)return f(6);s-=2;M[a]=v;break;}
   case 80:{const b=e.encode(String(D[s-1]));if(l+b.length>65536)return f(11);s--;o.set(b,l);l+=b.length;break;}
   case 81:
    if(l+1>65536)return f(11);
    o[l++]=D[--s]&255;break;
   case 82:D[s++]=i<q.length?q[i++]:-1;break;
   case 83:return f(D[--s]&255);
   default:{
    const b=D[s-1],a=D[s-2];let r:number;
    switch(op){
     case 16:r=(a+b)|0;break;
     case 17:r=(a-b)|0;break;
     case 18:r=Math.imul(a,b);break;
     case 19:if(b===0)return f(4);r=a===-2147483648&&b===-1?a:(a/b)|0;break;
     case 20:if(b===0)return f(4);r=b===-1?0:(a%b)|0;break;
     case 21:if(b===0)return f(4);r=Math.floor((a>>>0)/(b>>>0))|0;break;
     case 22:if(b===0)return f(4);r=((a>>>0)%(b>>>0))|0;break;
     case 24:r=a&b;break;
     case 25:r=a|b;break;
     case 26:r=a^b;break;
     case 28:r=a<<(b&31);break;
     case 29:r=a>>(b&31);break;
     case 30:r=(a>>>(b&31))|0;break;
     case 32:r=a===b?1:0;break;
     case 33:r=a<b?1:0;break;
     default:r=(a>>>0)<(b>>>0)?1:0;
    }
    s-=2;D[s++]=r;
   }
  }
 }
}
const I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';
for(const id of readdirSync(I).sort()){
 const r=run(new Uint8Array(readFileSync(join(I,id,'program.bin'))),new Uint8Array(readFileSync(join(I,id,'input.bin'))));
 mkdirSync(join(O,id),{recursive:true});
 writeFileSync(join(O,id,'stdout.bin'),r.out);
 writeFileSync(join(O,id,'exit.txt'),r.code+'\n');
}
