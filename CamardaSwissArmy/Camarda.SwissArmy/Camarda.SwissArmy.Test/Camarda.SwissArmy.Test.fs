module Camarda.SwissArmy.Test

// https://github.com/fsharp/FsCheck/blob/master/Docs/Documentation.md
// https://github.com/fsharp/FsUnit
// https://code.google.com/p/unquote/

open FsUnit
open FsCheck
open NUnit.Framework
open Swensen.Unquote
open Camarda.SwissArmy.core
open Camarda.SwissArmy.Settings

// all tests are failing

// Note on FsCheck tests: The NUnit test runner will still green-light failing tests with Check.Quick 
// even though it reports them as failing. Use Check.QuickThrowOnFailure instead.

[<Test>]
let ``combinePDFs sourceDirectory outputDirectory``() =
    //Assert.IsTrue(
    let result = core.combinePDFs "E:\OneDrive\innov820\camarda\TestPages\SourceDirectory", "E:\OneDrive\innov820\camarda\TestPages\OutputDirectory"
    Assert.IsTrue((result.ToString() = "true"))

    //Assert.IsTrue(core.combinePDFs ("E:\OneDrive\innov820\camarda\TestPages\SourceDirectory", "E:\OneDrive\innov820\camarda\TestPages\OutputDirectory"))

[<Test>]
let ``Registry - create SwissArmy entry``() =
    let swissArmyKeyName = "Camarda.SwissArmy"
    let baseKey = RegistryBaseKey.HKEYCurrentUser
    
    // Check if the entry exists first
    let swissArmyEntries = RegistryHelper.getKey(baseKey).GetSubKeyNames()
    //Brandon: Please explain me this.
    let exists = Array.tryFind (fun key -> key = swissArmyKeyName) swissArmyEntries
    
    //Brandon: Please explain me this.
    if exists.IsNone then 
        RegistryHelper.createRegistrySubKey baseKey swissArmyKeyName

    //Assert.IsNotNull exists
    let swissArmyEntries2 = RegistryHelper.getKey(baseKey).GetSubKeyNames()
    let exists2 = Array.tryFind (fun key -> key = swissArmyKeyName) swissArmyEntries2

    Assert.True exists2.IsSome
    
    //if exists.IsNone then 
        
    //(Array.exists(fun elem -> swissArmyEntry = swissArmyKeyName)) <> null
    //if exists then
            



    
