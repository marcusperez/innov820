namespace Camarda.SwissArmy

module core =

    open System
    open System.IO
    open PdfSharp.Pdf
    open PdfSharp.Pdf.IO

    let readPages (sourceFileName: string) =
        use source = PdfReader.Open(sourceFileName, PdfDocumentOpenMode.Import)
        [ for p in source.Pages -> p ]

    let createDocFromPages pages =
      let targetDoc = new PdfDocument()
      pages |> List.iter (fun p -> targetDoc.Pages.Add p |> ignore)
      targetDoc
 
    
    //["E:\OneDrive\innov820\camarda\TestPages\Camarda Test PDF File 1.pdf"; "E:\OneDrive\innov820\camarda\TestPages\Camarda Test PDF File 2.pdf"]
    let outputDirectory = "E:\OneDrive\innov820\camarda\TestPages\OutputDirectory" //Environment.CurrentDirectory;
    let targetFileName = Path.Combine(outputDirectory, "Result.pdf")
 
    let allPages(pdfDocs:string[]) =
      [ for n in pdfDocs -> n] 
      |> List.map readPages
      |> List.concat
 
    let combinePDFs sourceDirectory outputDirectory = 
        let docNames = Directory.GetFiles(sourceDirectory)    

        let doc = createDocFromPages (allPages docNames)
        if not (Directory.Exists outputDirectory) then 
            Directory.CreateDirectory(outputDirectory) |> ignore

        doc.Save targetFileName
        doc.Dispose()
        true

//module settings = 
    
    //open Microsoft.Win32

    //let saveSetting = Camarda.SwissArmy.Settings.RegistryHelper.setRegistryValue 